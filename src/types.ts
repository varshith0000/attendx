export type AttendanceStatus = 'Eligible' | 'Condonation range' | 'Attendance shortage';

export interface DailyRecord {
  date: string;
  code?: string;
  present: number;
  working: number;
  absent: number;
  percentage: number;
  status: 'present' | 'absent' | 'half' | 'holiday' | 'weekend' | 'unknown';
  raw?: Record<string, unknown>;
}

export interface StudentProfile {
  pin: string;
  studentName?: string;
  collegeCode?: string;
  collegeName?: string;
  district?: string;
  branchCode?: string;
  branchName?: string;
  scheme?: string;
  admissionYear?: string;
  semester?: string;
  attendancePct?: number;
  presentCredits?: number;
  totalWorkingDays?: number;
  absentDays?: number;
  lastUpdated?: string;
  status?: AttendanceStatus;
  rawResponse?: Record<string, unknown>;
  dailyRecords?: DailyRecord[];
}

export interface College {
  code: string;
  name: string;
  district: string;
  category: string;
  source: string;
  verifiedDate: string;
}

export interface Branch {
  code: string;
  name: string;
  shortName: string;
  schemes: string[];
  source: string;
}
