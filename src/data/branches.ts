import { Branch } from '../types';

export const branches: Branch[] = [
  { code: '101', name: 'Civil Engineering', shortName: 'CE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '102', name: 'Mechanical Engineering', shortName: 'ME', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '103', name: 'Electrical and Electronics Engineering', shortName: 'EEE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '104', name: 'Electronics and Communication Engineering', shortName: 'ECE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '105', name: 'Computer Science and Engineering', shortName: 'CSE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '106', name: 'Information Technology', shortName: 'IT', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '107', name: 'Instrumentation and Control Engineering', shortName: 'ICE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '108', name: 'Mining Engineering', shortName: 'MN', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '109', name: 'Automobile Engineering', shortName: 'AE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '110', name: 'Agricultural Engineering', shortName: 'AgE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '111', name: 'Chemical Engineering', shortName: 'ChE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '112', name: 'Textile Technology', shortName: 'TT', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '113', name: 'Electronics and Instrumentation', shortName: 'EI', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '114', name: 'Architecture Assistantship', shortName: 'AA', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '115', name: 'Medical Laboratory Technology', shortName: 'MLT', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '116', name: 'Pharmacy', shortName: 'PH', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '117', name: 'Leather Technology', shortName: 'LT', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '118', name: 'Metallurgy', shortName: 'MTE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '119', name: 'Electronics and Telecommunication Engineering', shortName: 'ETE', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '120', name: 'Artificial Intelligence and Machine Learning', shortName: 'AI&ML', schemes: ['C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '121', name: 'Data Science', shortName: 'DS', schemes: ['C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '122', name: 'Internet of Things', shortName: 'IoT', schemes: ['C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '123', name: 'Renewable Energy', shortName: 'RE', schemes: ['C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '124', name: 'Power Electronics', shortName: 'PE', schemes: ['C24','C26'], source: 'SBTET Telangana official branch records' },
  { code: '125', name: 'Commercial Practice', shortName: 'CP', schemes: ['C21','C24','C26'], source: 'SBTET Telangana official branch records' }
];

export const getBranchByCode = (code?: string) => {
  if (!code) return null;
  return branches.find((branch) => branch.code === String(code).trim());
};
