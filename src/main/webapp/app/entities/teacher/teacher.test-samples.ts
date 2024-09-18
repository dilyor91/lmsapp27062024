import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 16692,
  firstName: 'Kaden',
  lastName: 'West-Feil',
  gender: 'MALE',
  birthdate: 'ack abaft yuck',
  email: 'Angeline62@gmail.com',
  passportNumber: 'yowza however unexpectedly',
  jshshir: 'unto supposing',
};

export const sampleWithPartialData: ITeacher = {
  id: 28136,
  firstName: 'Alessandro',
  lastName: 'Crist',
  middleName: 'after growling vice',
  gender: 'FEMALE',
  birthdate: 'ha honoree',
  email: 'Braden3@hotmail.com',
  passportNumber: 'brr',
  jshshir: 'amenity rough an',
  isActive: true,
  country: 'South Georgia and the South Sandwich Islands',
  region: 'rot common',
  addressLine: 'upon beautiful',
  academicTitle: 'DOTSENT',
};

export const sampleWithFullData: ITeacher = {
  id: 652,
  firstName: 'Bethel',
  lastName: 'Hoeger',
  middleName: 'utterly how',
  gender: 'FEMALE',
  birthdate: 'bottom throughout owlishly',
  phoneNumber: 'finally awkwardly drat',
  email: 'Izaiah81@yahoo.com',
  passportNumber: 'reproachfully yippee scowl',
  jshshir: 'flex energetically',
  isActive: false,
  nationality: 'downturn er how',
  country: 'Taiwan',
  city: 'East Leila',
  region: 'barring',
  addressLine: 'furthermore however and',
  position: 'KAFEDRA_MUDIRI',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'PROFESSOR',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Yessenia',
  lastName: "O'Connell",
  gender: 'MALE',
  birthdate: 'banker reconsideration',
  email: 'Nelle_Lesch@gmail.com',
  passportNumber: 'resect oof',
  jshshir: 'blah',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
