import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 31877,
  firstName: 'Zakary',
  lastName: 'Beatty-Kreiger',
  gender: 'MALE',
  birthdate: 'critical instead',
  email: 'Leda.Reinger@yahoo.com',
  passportNumber: 'phew',
  jshshir: 'slacken unethically',
};

export const sampleWithPartialData: ITeacher = {
  id: 28336,
  firstName: 'Jakayla',
  lastName: 'Streich',
  gender: 'MALE',
  birthdate: 'until cleverly barley',
  email: 'Craig81@hotmail.com',
  passportNumber: 'boohoo alleviate into',
  jshshir: 'provided notwithstanding',
  country: 'Kiribati',
  region: 'hmph um',
  academicDegree: 'ILMIY_DARAJASIZ',
};

export const sampleWithFullData: ITeacher = {
  id: 13594,
  firstName: 'Mario',
  lastName: 'Stiedemann',
  middleName: 'wearily',
  gender: 'FEMALE',
  birthdate: 'times daybed oof',
  phoneNumber: 'huzzah about',
  email: 'Rodolfo_Kuhic81@yahoo.com',
  passportNumber: 'but unless evenly',
  jshshir: 'midline',
  isActive: false,
  nationality: 'skyscraper profit',
  country: 'Qatar',
  city: 'South Adalineberg',
  region: 'squiggly so cheerfully',
  addressLine: 'illumine',
  position: 'KATTA_OQITUVCHI',
  academicDegree: 'PHD',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Faustino',
  lastName: 'Kuhlman',
  gender: 'MALE',
  birthdate: 'hmph including',
  email: 'Jovani_Bartell21@gmail.com',
  passportNumber: 'yippee',
  jshshir: 'registry poorly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
