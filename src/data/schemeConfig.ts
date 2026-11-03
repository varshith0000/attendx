export const schemeConfig: Record<string, string> = {
  '2026': 'C26',
  '2025': 'C24',
  '2024': 'C24',
  '2023': 'C24',
  '2022': 'C21',
  '2021': 'C21',
};

export const resolveScheme = (admissionYear?: string | number, officialScheme?: string) => {
  const cleaned = String(admissionYear ?? '').trim();
  const mapped = cleaned && schemeConfig[cleaned];

  if (officialScheme && mapped && officialScheme !== mapped) {
    return { scheme: officialScheme, discrepancy: true, mappedScheme: mapped };
  }

  return { scheme: officialScheme || mapped || 'Information unavailable', discrepancy: false, mappedScheme: mapped || 'Information unavailable' };
};
