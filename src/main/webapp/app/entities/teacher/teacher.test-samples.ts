import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 10956,
  firstName: 'Cruz',
  lastName: 'Weissnat',
  gender: 'MALE',
  birthdate: 'aha coast',
  email: 'Kameron_Armstrong93@gmail.com',
  passportNumber: 'yahoo frizzy',
  jshshir: 'anenst',
};

export const sampleWithPartialData: ITeacher = {
  id: 22001,
  firstName: 'Jena',
  lastName: 'Schmeler',
  middleName: 'anenst inside',
  gender: 'FEMALE',
  birthdate: 'tenderly',
  email: 'Rosella_Maggio23@yahoo.com',
  passportNumber: 'unsteady',
  jshshir: 'repeatedly via',
  country: 'Comoros',
  city: 'Milanport',
  position: 'KAFEDRA_MUDIRI',
  academicDegree: 'PHD',
};

export const sampleWithFullData: ITeacher = {
  id: 27284,
  firstName: 'Lambert',
  lastName: 'Towne',
  middleName: 'sadly angle foolhardy',
  gender: 'MALE',
  birthdate: 'beloved',
  phoneNumber: 'dust',
  email: 'Renee41@yahoo.com',
  passportNumber: 'contribution silently below',
  jshshir: 'yet elegantly although',
  isActive: false,
  nationality: 'yowza',
  country: 'Burundi',
  city: 'Arvada',
  region: 'um liquid even',
  addressLine: 'astride zowie',
  position: 'PROFESSOR',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Coty',
  lastName: 'Hirthe',
  gender: 'MALE',
  birthdate: 'drama',
  email: 'Leslie.Spinka@hotmail.com',
  passportNumber: 'insecure bat',
  jshshir: 'aha',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
