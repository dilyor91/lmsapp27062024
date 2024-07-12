import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 777,
  firstName: 'Godfrey',
  lastName: 'Corkery',
  gender: 'MALE',
  birthdate: 'and uh-huh pace',
  email: 'Destinee_Collins-Barrows64@yahoo.com',
  passportNumber: 'so',
  jshshir: 'armor change',
};

export const sampleWithPartialData: ITeacher = {
  id: 29199,
  firstName: 'Roberto',
  lastName: 'Wyman',
  gender: 'FEMALE',
  birthdate: 'pince-nez',
  email: 'Cortez.Sanford64@gmail.com',
  passportNumber: 'half helpfully',
  jshshir: 'embezzle um half-sister',
  position: 'KAFEDRA_MUDIRI',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'DOTSENT',
};

export const sampleWithFullData: ITeacher = {
  id: 10086,
  firstName: 'Yasmine',
  lastName: 'Schulist',
  middleName: 'unlike inasmuch',
  gender: 'MALE',
  birthdate: 'wherever',
  phoneNumber: 'notwithstanding takeover',
  email: 'Joel.Abernathy@gmail.com',
  passportNumber: 'boohoo hourly',
  jshshir: 'instead strength',
  isActive: true,
  nationality: 'happily',
  country: 'Botswana',
  city: 'Pharr',
  region: 'what little',
  addressLine: 'psst',
  position: 'KATTA_OQITUVCHI',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Gavin',
  lastName: 'Considine-Collier',
  gender: 'FEMALE',
  birthdate: 'duh inasmuch',
  email: 'Kole64@hotmail.com',
  passportNumber: 'candle qua slump',
  jshshir: 'ouch',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
