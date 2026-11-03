export const getAttendanceStatus = (percentage: number): 'Eligible' | 'Condonation range' | 'Attendance shortage' => {
  if (percentage >= 75) return 'Eligible';
  if (percentage >= 65) return 'Condonation range';
  return 'Attendance shortage';
};

export const formatPercentage = (value?: number | null) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'Information unavailable';
  return `${value.toFixed(2)}%`;
};

export const calculateRequiredDays75 = (present: number, total: number) => {
  if (!Number.isFinite(present) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.max(0, Math.ceil((0.75 * total - present) / 0.25));
};

export const calculateRequiredDays65 = (present: number, total: number) => {
  if (!Number.isFinite(present) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.max(0, Math.ceil((0.65 * total - present) / 0.35));
};

export const getEffectiveAttendance = (present: number, total: number) => {
  if (!Number.isFinite(present) || !Number.isFinite(total) || total <= 0) return 0;
  return (present / total) * 100;
};

export const calculateSafeAbsences = (present: number, total: number, additionalAttended = 0) => {
  if (!Number.isFinite(present) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.max(0, Math.floor(((present + additionalAttended) / 0.75) - (total + additionalAttended)));
};

export const calculateProjectedAttendance = (present: number, total: number, additionalAttended: number, additionalAbsent: number) => {
  const projectedPresent = present + additionalAttended;
  const projectedWorkingDays = total + additionalAttended + additionalAbsent;
  return {
    projectedPresent,
    projectedWorkingDays,
    projectedPercentage: projectedWorkingDays > 0 ? (projectedPresent / projectedWorkingDays) * 100 : 0,
  };
};
