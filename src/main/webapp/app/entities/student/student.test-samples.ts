import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 17146,
  firstName: 'Linnea',
  lastName: 'Larson',
  middleName: 'ugh instead proud',
  gender: 'over',
  birthdate: 'why why waft',
  email: 'Alycia56@yahoo.com',
  passportNumber: 'thankfully stencil',
  jshshir: 'meanwhile tame',
};

export const sampleWithPartialData: IStudent = {
  id: 28630,
  firstName: 'Bradley',
  lastName: 'Hilpert',
  middleName: 'absent',
  gender: 'vigilant robust limb',
  birthdate: 'emotional',
  phoneNumber: 'rudely',
  email: 'Fay53@gmail.com',
  passportNumber: 'interview per',
  jshshir: 'sandy bravely',
  isActive: true,
  country: 'Mongolia',
  region: 'dis hungrily',
  semester: 9719,
  educationLanguage: 'RUSSIAN',
};

export const sampleWithFullData: IStudent = {
  id: 21549,
  firstName: 'Ellen',
  lastName: 'Kunze-Kirlin',
  middleName: 'except event favorable',
  gender: 'combat mmm',
  birthdate: 'while',
  phoneNumber: 'nectar',
  email: 'Doyle_OKeefe15@hotmail.com',
  hemisId: 8088,
  passportNumber: 'an',
  jshshir: 'foam strive helplessly',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'outclass some wide-eyed',
  country: 'Ecuador',
  city: 'Lake Lysanne',
  region: 'off',
  addressLine: 'cheerful',
  course: 22572,
  semester: 13218,
  educationLanguage: 'RUSSIAN',
  educationType: 'SIRTQI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Ambrose',
  lastName: 'Jenkins',
  middleName: 'vicious mob',
  gender: 'chops crossly at',
  birthdate: 'spicy smoothly gadzooks',
  email: 'Una59@yahoo.com',
  passportNumber: 'phew partially ew',
  jshshir: 'undershirt although advanced',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
