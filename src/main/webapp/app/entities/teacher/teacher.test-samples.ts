import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 25424,
  firstName: 'Gracie',
  lastName: 'Mann',
  gender: 'FEMALE',
  birthdate: 'after',
  email: 'Boyd.Mertz@hotmail.com',
  passportNumber: 'strand prisoner',
  jshshir: 'for',
};

export const sampleWithPartialData: ITeacher = {
  id: 28807,
  firstName: 'Ashtyn',
  lastName: 'Collier',
  middleName: 'aside vacant ouch',
  gender: 'MALE',
  birthdate: 'hm pace',
  phoneNumber: 'firm',
  email: 'Vicenta_Balistreri@yahoo.com',
  passportNumber: 'gadzooks',
  jshshir: 'astride fast',
  country: 'Malaysia',
  city: 'Roswell',
  addressLine: 'epitomise finally',
};

export const sampleWithFullData: ITeacher = {
  id: 27861,
  firstName: 'Lukas',
  lastName: 'Dicki',
  middleName: 'well-to-do immediately yippee',
  gender: 'FEMALE',
  birthdate: 'likewise',
  phoneNumber: 'internal cube geez',
  email: 'Wilma.Crona@gmail.com',
  passportNumber: 'sandblast scheme supposing',
  jshshir: 'anenst athwart',
  isActive: false,
  nationality: 'boastfully blah snob',
  country: 'Saudi Arabia',
  city: 'Lake Hosea',
  region: 'coaxingly',
  addressLine: 'woot minus',
  position: 'DOTSENT',
  academicDegree: 'FAN_DOCTORI',
  academicTitle: 'DOTSENT',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Lavon',
  lastName: 'Bashirian',
  gender: 'MALE',
  birthdate: 'from protest soap',
  email: 'Onie52@hotmail.com',
  passportNumber: 'worthless',
  jshshir: 'curse',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
