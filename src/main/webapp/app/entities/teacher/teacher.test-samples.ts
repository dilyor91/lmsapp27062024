import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 22281,
  firstName: 'Caterina',
  lastName: 'Braun',
  gender: 'MALE',
  birthdate: 'reanimate even anti',
  email: 'Kayli1@gmail.com',
  passportNumber: 'unnecessarily eavesdropper grizzled',
  jshshir: 'aw',
};

export const sampleWithPartialData: ITeacher = {
  id: 11472,
  firstName: 'Bernard',
  lastName: 'Mohr',
  middleName: 'yippee',
  gender: 'MALE',
  birthdate: 'fond gosh',
  phoneNumber: 'wherever',
  email: 'Davion_Walker@gmail.com',
  passportNumber: 'painfully fritter expansion',
  jshshir: 'who instead',
  nationality: 'sharp ultimately green',
  country: 'Peru',
  position: 'KATTA_OQITUVCHI',
};

export const sampleWithFullData: ITeacher = {
  id: 23483,
  firstName: 'Lucius',
  lastName: 'Goldner',
  middleName: 'crossly',
  gender: 'FEMALE',
  birthdate: 'model unless',
  phoneNumber: 'hmph huzzah powerful',
  email: 'Sadie_Smitham@yahoo.com',
  passportNumber: 'barring',
  jshshir: 'even',
  isActive: false,
  nationality: 'querulous pension hoodwink',
  country: 'Sweden',
  city: 'Keller',
  region: 'well-made while considering',
  addressLine: 'billboard divide reproachfully',
  position: 'KAFEDRA_MUDIRI',
  academicDegree: 'FAN_DOCTORI',
  academicTitle: 'PROFESSOR',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Earnestine',
  lastName: 'Miller-Hettinger',
  gender: 'FEMALE',
  birthdate: 'through',
  email: 'Paolo.Marquardt7@hotmail.com',
  passportNumber: 'aboard among courageously',
  jshshir: 'sluice among forge',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
