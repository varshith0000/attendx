import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { z } from 'zod';
import { resolveScheme } from '../src/data/schemeConfig.js';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

const pinSchema = z.string().trim().min(4).max(15).regex(/^[A-Za-z0-9]+$/);

const fetchAttendance = async (pin: string) => {
  const url = `https://www.sbtet.telangana.gov.in/api/api/PreExamination/getAttendanceReport?Pin=${encodeURIComponent(pin)}`;
  const response = await axios.get(url, {
    timeout: 18000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'application/json,text/plain,*/*',
      Referer: 'https://www.sbtet.telangana.gov.in/',
    },
  });

  return response.data;
};

const normalizeValue = (value: unknown) => {
  if (value === null || value === undefined || value === '') return 'Information unavailable';
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || 'Information unavailable';
  }
  return String(value);
};

const toNumber = (raw: unknown) => {
  if (raw === null || raw === undefined || raw === '') return 0;
  const parsed = Number(String(raw).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeAttendanceResponse = (payload: any) => {
  const table = Array.isArray(payload?.Table) ? payload.Table : [];
  const table1 = Array.isArray(payload?.Table1) ? payload.Table1 : [];

  const student = table.find((row: any) => row && (row.StudentName || row.StudentName_ || row.Name)) ?? table[0] ?? {};
  const summary = table1.find((row: any) => row && (row.TotalWorkingDays || row.WorkingDays || row.Present || row.Attendance)) ?? table1[0] ?? {};

  const studentName = normalizeValue(student.StudentName ?? student.Student_Name ?? student.Name ?? student.name ?? student.studentName);
  const pin = normalizeValue(student.Pin ?? student.PIN ?? student.pin ?? 'Information unavailable');
  const collegeCode = normalizeValue(student.CollegeCode ?? student.College_Id ?? student.CollegeCode_ ?? student.CollegeId ?? student.collegeCode);
  const branchCode = normalizeValue(student.BranchCode ?? student.Branch_Id ?? student.BranchCode_ ?? student.BranchId ?? student.branchCode);
  const scheme = normalizeValue(student.Scheme ?? student.scheme ?? student.AcademicScheme ?? 'Information unavailable');
  const admissionYear = normalizeValue(student.AdmissionYear ?? student.Admission_Year ?? student.Year ?? student.admissionYear ?? 'Information unavailable');
  const semester = normalizeValue(student.Semester ?? student.CurrentSemester ?? student.SemesterName ?? student.semester ?? 'Information unavailable');

  const present = toNumber(summary.Present ?? summary.PresentDays ?? summary.PresentCredits ?? student.Present ?? student.present);
  const total = toNumber(summary.TotalWorkingDays ?? summary.WorkingDays ?? summary.TotalDays ?? summary.TotalCredits ?? student.TotalWorkingDays ?? student.totalWorkingDays);
  const absent = toNumber(summary.Absent ?? summary.AbsentDays ?? summary.AbsentCredits ?? Math.max(total - present, 0));
  const attendancePct = total > 0 ? (present / total) * 100 : 0;

  const normalized = {
    studentName: studentName === 'Information unavailable' ? 'Information unavailable' : studentName,
    pin,
    collegeCode,
    branchCode,
    scheme,
    admissionYear,
    semester,
    present,
    total,
    absent,
    attendancePct,
    lastUpdated: new Date().toISOString(),
    raw: payload,
    table,
    table1,
  };

  return normalized;
};

app.get('/api/attendance', async (req, res) => {
  try {
    const pin = String(req.query.pin ?? '').trim();
    const parsed = pinSchema.safeParse(pin);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid Polytechnic PIN using letters or numbers only.',
      });
    }

    const response = await fetchAttendance(parsed.data);
    const normalized = normalizeAttendanceResponse(response);

    const result = {
      success: true,
      data: {
        ...normalized,
        scheme: resolveScheme(normalized.admissionYear === 'Information unavailable' ? undefined : normalized.admissionYear, normalized.scheme === 'Information unavailable' ? undefined : normalized.scheme),
      },
    };

    return res.json(result);
  } catch (error: any) {
    let msg = 'Attendance service is temporarily unavailable. Please try again.';
    if (error?.response?.status === 404) msg = 'The attendance service could not find the requested student record.';
    if (error?.code === 'ECONNABORTED') msg = 'The request to the SBTET attendance service timed out. Please retry.';
    if (error?.response?.status >= 500) msg = 'The SBTET attendance service is unavailable right now.';

    return res.status(502).json({ success: false, message: msg, raw: error?.message || null });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'AttendX backend', time: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`AttendX API listening on http://localhost:${port}`);
});
