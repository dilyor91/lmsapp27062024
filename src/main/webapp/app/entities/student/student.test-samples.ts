import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 15833,
  firstName: 'Theo',
  lastName: 'Ritchie',
  middleName: 'oof',
  gender: 'via dredger where',
  birthdate: 'versus wretched fooey',
  email: 'Marilie18@yahoo.com',
  passportNumber: 'proofread dash',
  jshshir: 'beside hopelessly grandiose',
};

export const sampleWithPartialData: IStudent = {
  id: 23118,
  firstName: 'Dillan',
  lastName: 'Beatty',
  middleName: 'phrase',
  gender: 'deselect clinch',
  birthdate: 'bah zowie besides',
  phoneNumber: 'lovingly however over',
  email: 'Jules_Stiedemann@hotmail.com',
  passportNumber: 'legislature',
  jshshir: 'abnormally coolly',
  country: 'Djibouti',
  city: 'Wyoming',
  region: 'anticodon swim',
  educationLanguage: 'ENGLISH',
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 25417,
  firstName: 'Kaci',
  lastName: 'Murphy',
  middleName: 'eke muffled',
  gender: 'ski',
  birthdate: 'considering wisely provided',
  phoneNumber: 'longingly sushi colorless',
  email: 'Patience.Kshlerin13@yahoo.com',
  hemisId: 2344,
  passportNumber: 'aboard',
  jshshir: 'confound issue',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'far',
  country: 'Liechtenstein',
  city: 'Lake Wilhelm',
  region: 'aw',
  addressLine: 'for while',
  course: 29139,
  semester: 14850,
  educationLanguage: 'RUSSIAN',
  educationType: 'KECHKI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Diana',
  lastName: 'Monahan',
  middleName: 'steak boohoo',
  gender: 'boohoo',
  birthdate: 'produce hence how',
  email: 'Enoch73@yahoo.com',
  passportNumber: 'inwardly',
  jshshir: 'stealthily',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
