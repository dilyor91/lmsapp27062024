import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 22490,
  firstName: 'Antwan',
  lastName: 'Wolff',
  gender: 'MALE',
  birthdate: 'after distorted oof',
  email: 'Lucius_Rolfson49@gmail.com',
  passportNumber: 'throughout over anti',
  jshshir: 'meanwhile aw',
};

export const sampleWithPartialData: ITeacher = {
  id: 4731,
  firstName: 'Jerel',
  lastName: 'Legros',
  gender: 'MALE',
  birthdate: 'save database wowee',
  phoneNumber: 'wetly alleviate solemnly',
  email: 'Kendall_Gutmann@yahoo.com',
  passportNumber: 'ew weekly divest',
  jshshir: 'joshingly',
  position: 'KAFEDRA_MUDIRI',
};

export const sampleWithFullData: ITeacher = {
  id: 28596,
  firstName: 'Darrell',
  lastName: 'Botsford',
  middleName: 'throughout',
  gender: 'FEMALE',
  birthdate: 'client hm',
  phoneNumber: 'pear unless geez',
  email: 'Dagmar55@gmail.com',
  passportNumber: 'concerning well',
  jshshir: 'picture',
  isActive: true,
  nationality: 'unwieldy gee since',
  country: 'Equatorial Guinea',
  city: 'Brekkeland',
  region: 'up nor drat',
  addressLine: 'opposite joyfully what',
  position: 'DOTSENT',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'PROFESSOR',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Krystal',
  lastName: 'Beahan',
  gender: 'MALE',
  birthdate: 'warmly adventurous',
  email: 'Pattie36@yahoo.com',
  passportNumber: 'unless nearly',
  jshshir: 'underneath gah accessorise',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
