import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 21026,
  firstName: 'Merl',
  lastName: 'Torphy',
  gender: 'MALE',
  birthdate: 'partially bah',
  email: 'Burley_Runolfsdottir69@hotmail.com',
  passportNumber: 'atop',
  jshshir: 'smoothly',
};

export const sampleWithPartialData: ITeacher = {
  id: 997,
  firstName: 'Lora',
  lastName: 'Hermann',
  gender: 'FEMALE',
  birthdate: 'unless boggle',
  email: 'Abigayle88@hotmail.com',
  passportNumber: 'breastplate duh',
  jshshir: 'to wound heavily',
  nationality: 'rightfully around',
  city: 'Yostport',
  position: 'ASSISTENT',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithFullData: ITeacher = {
  id: 8365,
  firstName: 'Tommie',
  lastName: 'Zboncak',
  middleName: 'next',
  gender: 'MALE',
  birthdate: 'at cellar',
  phoneNumber: 'regal',
  email: 'Harold17@gmail.com',
  passportNumber: 'merge mutate provided',
  jshshir: 'notarize pronoun',
  isActive: false,
  nationality: 'than mean',
  country: 'Falkland Islands (Malvinas)',
  city: 'Valliefield',
  region: 'oof ha beep',
  addressLine: 'fooey mature zowie',
  position: 'PROFESSOR',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Birdie',
  lastName: 'Huel',
  gender: 'MALE',
  birthdate: 'hm mechanically',
  email: 'Kayden.Prosacco@yahoo.com',
  passportNumber: 'when decouple rapid',
  jshshir: 'phew',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
