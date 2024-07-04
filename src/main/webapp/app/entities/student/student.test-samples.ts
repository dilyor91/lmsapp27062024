import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 29499,
  firstName: 'Kenyatta',
  lastName: 'Stroman',
  middleName: 'ew',
  gender: 'jackknife separately',
  birthdate: 'woot',
  email: 'Marion_Quigley@hotmail.com',
  passportNumber: 'appreciation furthermore leaver',
  jshshir: 'gee wonderfully onto',
};

export const sampleWithPartialData: IStudent = {
  id: 13582,
  firstName: 'Melany',
  lastName: 'Renner',
  middleName: 'above ouch',
  gender: 'but phooey',
  birthdate: 'after safely',
  email: 'Kyle46@yahoo.com',
  passportNumber: 'take shopping',
  jshshir: 'complex',
  nationality: 'faithful',
  country: 'Kazakhstan',
  region: 'under',
  addressLine: 'protect',
  course: 31718,
  educationType: 'KUNDUZGI',
};

export const sampleWithFullData: IStudent = {
  id: 11532,
  firstName: 'Leonardo',
  lastName: 'Halvorson',
  middleName: 'homework against patrol',
  gender: 'firm bountiful gently',
  birthdate: 'meanwhile',
  phoneNumber: 'devil',
  email: 'Karli.Keeling@yahoo.com',
  hemisId: 1475,
  passportNumber: 'what accustom than',
  jshshir: 'enfold off',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'what thankfully absent',
  country: 'Western Sahara',
  city: 'South Carlottaborough',
  region: 'hmph',
  addressLine: 'cannon besides',
  course: 30481,
  semester: 16402,
  educationLanguage: 'ENGLISH',
  educationType: 'KUNDUZGI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Kianna',
  lastName: 'Miller',
  middleName: 'property',
  gender: 'cower violently throughout',
  birthdate: 'actually well',
  email: 'Jaylon_Sporer54@gmail.com',
  passportNumber: 'case',
  jshshir: 'which naturally typecast',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
