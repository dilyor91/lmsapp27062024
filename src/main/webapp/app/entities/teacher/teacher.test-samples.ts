import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 16789,
  firstName: 'Idell',
  lastName: 'Goodwin',
  gender: 'MALE',
  birthdate: 'excluding whine physical',
  email: 'Mckenzie.Bradtke@gmail.com',
  passportNumber: 'where boo',
  jshshir: 'at',
};

export const sampleWithPartialData: ITeacher = {
  id: 30143,
  firstName: 'Shawna',
  lastName: 'Rempel',
  middleName: 'dreamily',
  gender: 'MALE',
  birthdate: 'vestment from',
  phoneNumber: 'whoa fervently',
  email: 'Norberto43@gmail.com',
  passportNumber: 'mature anxiously',
  jshshir: 'whenever oh that',
  region: 'regularly unaccountably',
  position: 'KATTA_OQITUVCHI',
};

export const sampleWithFullData: ITeacher = {
  id: 15885,
  firstName: 'Quincy',
  lastName: 'Borer',
  middleName: 'sometimes heighten',
  gender: 'FEMALE',
  birthdate: 'more vastly',
  phoneNumber: 'excepting tragic amazing',
  email: 'Anissa.Kerluke@yahoo.com',
  passportNumber: 'clamp eek ew',
  jshshir: 'mortise',
  isActive: true,
  nationality: 'quaintly',
  country: 'Afghanistan',
  city: 'Kingsport',
  region: 'zowie',
  addressLine: 'stock hunger',
  position: 'ASSISTENT',
  academicDegree: 'FAN_DOCTORI',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Briana',
  lastName: 'Ullrich',
  gender: 'MALE',
  birthdate: 'around',
  email: 'Shanny.Nitzsche70@hotmail.com',
  passportNumber: 'ham',
  jshshir: 'gosh',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
