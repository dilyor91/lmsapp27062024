import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 16620,
  firstName: 'Brenna',
  lastName: 'Sawayn',
  gender: 'FEMALE',
  birthdate: 'with couple',
  email: 'Nella_Kassulke79@hotmail.com',
  passportNumber: 'if muted jolly',
  jshshir: 'syndrome',
};

export const sampleWithPartialData: ITeacher = {
  id: 20700,
  firstName: 'Anthony',
  lastName: 'Walsh',
  gender: 'FEMALE',
  birthdate: 'snappy',
  phoneNumber: 'mmm flimsy',
  email: 'Guiseppe26@yahoo.com',
  passportNumber: 'pace',
  jshshir: 'and until fiercely',
  isActive: false,
  nationality: 'oh',
  addressLine: 'besides',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'DOTSENT',
};

export const sampleWithFullData: ITeacher = {
  id: 24522,
  firstName: 'Amber',
  lastName: 'Cummings',
  middleName: 'beyond',
  gender: 'FEMALE',
  birthdate: 'unless generally',
  phoneNumber: 'navigate pipeline pro',
  email: 'Jacey.Shanahan17@hotmail.com',
  passportNumber: 'for',
  jshshir: 'um yahoo needily',
  isActive: true,
  nationality: 'qua share tremendously',
  country: 'Taiwan',
  city: 'West Stevie',
  region: 'tightly',
  addressLine: 'item',
  position: 'ASSISTENT',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Braden',
  lastName: 'Jast',
  gender: 'MALE',
  birthdate: 'terminology enormously',
  email: 'Emmanuel99@yahoo.com',
  passportNumber: 'vaporise secret',
  jshshir: 'before tepid repeatedly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
