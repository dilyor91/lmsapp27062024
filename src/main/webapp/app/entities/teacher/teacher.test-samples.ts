import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 21812,
  firstName: 'Shaina',
  lastName: 'Renner',
  gender: 'FEMALE',
  birthdate: 'yahoo oh professionalize',
  email: 'Andreanne_Metz56@gmail.com',
  passportNumber: 'washcloth',
  jshshir: 'aw eek',
};

export const sampleWithPartialData: ITeacher = {
  id: 8744,
  firstName: 'Daren',
  lastName: 'Barrows',
  gender: 'FEMALE',
  birthdate: 'uh-huh',
  email: 'Carolina.Christiansen25@hotmail.com',
  passportNumber: 'redhead so past',
  jshshir: 'yearningly voyage',
  city: 'North Lillian',
  region: 'aha',
  addressLine: 'atop',
  academicDegree: 'PHD',
};

export const sampleWithFullData: ITeacher = {
  id: 31797,
  firstName: 'Noble',
  lastName: 'Hoeger',
  middleName: 'a redound boohoo',
  gender: 'FEMALE',
  birthdate: 'different expensive',
  phoneNumber: 'now pfft um',
  email: 'Vanessa.Ullrich82@yahoo.com',
  passportNumber: 'without hourly subway',
  jshshir: 'regularly apropos',
  isActive: false,
  nationality: 'pursue atop deeply',
  country: 'Argentina',
  city: 'South Johnpaulport',
  region: 'and',
  addressLine: 'if',
  position: 'DOTSENT',
  academicDegree: 'PHD',
  academicTitle: 'DOTSENT',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Chanelle',
  lastName: 'Larson',
  gender: 'MALE',
  birthdate: 'graphic',
  email: 'Jarrell19@yahoo.com',
  passportNumber: 'interval',
  jshshir: 'geez worried',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
