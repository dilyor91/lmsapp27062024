import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 16506,
  firstName: 'Aleen',
  lastName: 'Tromp',
  middleName: 'finally acceptance',
  gender: 'ew',
  birthdate: 'to till dice',
  email: 'Kylee.Terry@gmail.com',
  passportNumber: 'clump ill-fated',
  jshshir: 'plunder',
};

export const sampleWithPartialData: IStudent = {
  id: 15627,
  firstName: 'Johanna',
  lastName: 'Wuckert',
  middleName: 'through scientific',
  gender: 'vascular',
  birthdate: 'or dental',
  phoneNumber: 'forenenst ick',
  email: 'Vincent_Ziemann26@hotmail.com',
  hemisId: 26267,
  passportNumber: 'cold',
  jshshir: 'woodshed symptom so',
  isActive: false,
  tutionType: 'GRANT',
  country: 'Russian Federation',
  course: 32401,
  educationType: 'KECHKI',
  educationForm: 'MAGISTR',
};

export const sampleWithFullData: IStudent = {
  id: 2183,
  firstName: 'Kareem',
  lastName: 'Lueilwitz',
  middleName: 'offensively quarterly though',
  gender: 'import',
  birthdate: 'yesterday gosh',
  phoneNumber: 'pace while',
  email: 'Stephany57@hotmail.com',
  hemisId: 9256,
  passportNumber: 'till rigidly',
  jshshir: 'wavy attendance',
  isActive: true,
  tutionType: 'GRANT',
  nationality: 'so however azimuth',
  country: 'Pitcairn Islands',
  city: 'Malcolmshire',
  region: 'yuck narrow',
  addressLine: 'acidly greedy',
  course: 10583,
  semester: 28692,
  educationLanguage: 'UZBEK',
  educationType: 'SIRTQI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Abe',
  lastName: 'Blanda',
  middleName: 'mirror consequently woot',
  gender: 'integrity mmm',
  birthdate: 'stage excluding huzzah',
  email: 'Laurianne33@hotmail.com',
  passportNumber: 'phooey funding',
  jshshir: 'subdue resurrect generous',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
