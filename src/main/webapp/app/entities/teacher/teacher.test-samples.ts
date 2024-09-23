import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 31400,
  firstName: 'Albina',
  lastName: 'Morar',
  gender: 'MALE',
  birthdate: 'pish reassuringly',
  email: 'Melyssa.Beier@gmail.com',
  passportNumber: 'anti',
  jshshir: 'ultimate',
};

export const sampleWithPartialData: ITeacher = {
  id: 26000,
  firstName: 'Colton',
  lastName: 'Pollich',
  gender: 'MALE',
  birthdate: 'certify',
  phoneNumber: 'insecure',
  email: 'Kennedy_Rolfson@yahoo.com',
  passportNumber: 'for',
  jshshir: 'though tighten',
  country: 'United Kingdom',
  region: 'than',
};

export const sampleWithFullData: ITeacher = {
  id: 6994,
  firstName: 'Emilio',
  lastName: 'McLaughlin',
  middleName: 'what including',
  gender: 'MALE',
  birthdate: 'motionless',
  phoneNumber: 'always dreamily',
  email: 'Julian22@hotmail.com',
  passportNumber: 'reproachfully perky',
  jshshir: 'hence oh',
  isActive: true,
  nationality: 'awkwardly plus',
  country: 'Montserrat',
  city: 'North Carlosbury',
  region: 'cheetah after oh',
  addressLine: 'now',
  position: 'PROFESSOR',
  academicDegree: 'PHD',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Matt',
  lastName: 'Quigley',
  gender: 'FEMALE',
  birthdate: 'oh cripple farmer',
  email: 'Noel_Huel24@gmail.com',
  passportNumber: 'softly',
  jshshir: 'when without elegantly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
