import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 21378,
  firstName: 'Emelie',
  lastName: 'Pacocha-Koss',
  gender: 'FEMALE',
  birthdate: 'yahoo rare',
  email: 'Destiney41@hotmail.com',
  passportNumber: 'transmute reassuringly versus',
  jshshir: 'across',
};

export const sampleWithPartialData: ITeacher = {
  id: 22025,
  firstName: 'Vanessa',
  lastName: 'Orn',
  middleName: 'apud',
  gender: 'MALE',
  birthdate: 'yet midst inflame',
  email: 'Naomie22@gmail.com',
  passportNumber: 'sure-footed',
  jshshir: 'wise swiftly',
  city: 'West Aiyanatown',
  region: 'at',
  addressLine: 'ack between',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithFullData: ITeacher = {
  id: 24900,
  firstName: 'Arely',
  lastName: 'Denesik',
  middleName: 'hence amused after',
  gender: 'MALE',
  birthdate: 'forenenst why rule',
  phoneNumber: 'ack enmesh mid',
  email: 'Demario24@yahoo.com',
  passportNumber: 'indeed clamp lovingly',
  jshshir: 'unnecessarily',
  isActive: true,
  nationality: 'fairly harmonious resurrect',
  country: 'Antarctica',
  city: 'Johnsville',
  region: 'sardonic joyously',
  addressLine: 'whenever flan likewise',
  position: 'KAFEDRA_MUDIRI',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'PROFESSOR',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Nora',
  lastName: 'Wuckert',
  gender: 'FEMALE',
  birthdate: 'guilty',
  email: 'Danielle53@hotmail.com',
  passportNumber: 'quizzically genre only',
  jshshir: 'distribute ferociously',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
