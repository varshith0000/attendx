import { getBranchByCode } from '../src/data/branches';
import { getCollegeByCode } from '../src/data/colleges';
import { getAttendanceStatus } from '../src/lib/attendance';

export const formatPin = (pin?: string) => {
  if (!pin) return 'Information unavailable';
  return String(pin).trim();
};

export const getStudentSummary = (student: any) => {
  const college = getCollegeByCode(student?.collegeCode || student?.college_code);
  const branch = getBranchByCode(student?.branchCode || student?.branch_code);
  const pct = typeof student?.attendancePct === 'number' ? student.attendancePct : 0;

  return {
    pin: formatPin(student?.pin),
    studentName: student?.studentName || 'Information unavailable',
    collegeCode: student?.collegeCode || 'Information unavailable',
    collegeName: college?.name || student?.collegeName || 'Information unavailable',
    district: college?.district || student?.district || 'Information unavailable',
    branchCode: student?.branchCode || 'Information unavailable',
    branchName: branch?.name || student?.branchName || 'Information unavailable',
    scheme: student?.scheme || 'Information unavailable',
    admissionYear: student?.admissionYear || 'Information unavailable',
    semester: student?.semester || 'Information unavailable',
    attendancePct: pct,
    presentCredits: student?.present ?? 0,
    totalWorkingDays: student?.total ?? 0,
    absentDays: student?.absent ?? 0,
    status: getAttendanceStatus(pct),
    lastUpdated: student?.lastUpdated || new Date().toISOString(),
  };
};

export const getDaysRequiredToReach75 = (present: number, total: number) => {
  if (!Number.isFinite(present) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.max(0, Math.ceil((0.75 * total - present) / 0.25));
};
