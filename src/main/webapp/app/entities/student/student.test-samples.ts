import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 188,
  firstName: 'Augusta',
  lastName: 'Jones',
  middleName: 'kindheartedly anti cultivator',
  gender: 'blood evil scupper',
  birthdate: 'politicise upwardly',
  email: 'Alejandrin.Treutel-Gibson61@yahoo.com',
  passportNumber: 'chorus longingly',
  jshshir: 'entrance ignorance',
};

export const sampleWithPartialData: IStudent = {
  id: 22640,
  firstName: 'Pearlie',
  lastName: 'Hagenes',
  middleName: 'guilder suspiciously amidst',
  gender: 'ah vacantly',
  birthdate: 'limply',
  email: 'Luz_Dickinson14@yahoo.com',
  passportNumber: 'because among ack',
  jshshir: 'interestingly furiously onto',
  tutionType: 'GRANT',
  nationality: 'unto questionably',
  country: 'Nicaragua',
  region: 'meanwhile',
  educationType: 'SIRTQI',
  educationForm: 'MAGISTR',
};

export const sampleWithFullData: IStudent = {
  id: 10532,
  firstName: 'Cristina',
  lastName: 'Kassulke',
  middleName: 'spherical eek digitize',
  gender: 'past but limply',
  birthdate: 'sphere psst',
  phoneNumber: 'against earth',
  email: 'Neal_Auer@yahoo.com',
  hemisId: 7527,
  passportNumber: 'hm',
  jshshir: 'amongst hmph',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'hull around sheepishly',
  country: 'French Polynesia',
  city: 'St. Petersburg',
  region: 'warmly placate hmph',
  addressLine: 'brand faculty perky',
  course: 5276,
  semester: 25519,
  educationLanguage: 'ENGLISH',
  educationType: 'KECHKI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Grover',
  lastName: 'Pouros',
  middleName: 'oh questionably phew',
  gender: 'alongside impolite',
  birthdate: 'crafty considering',
  email: 'Jade37@hotmail.com',
  passportNumber: 'kindheartedly',
  jshshir: 'mysteriously whose',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
