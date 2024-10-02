import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 23254,
  firstName: 'Erich',
  lastName: 'Metz',
  middleName: 'hence testimonial',
  gender: 'atop concerned bah',
  birthdate: 'unexpectedly joy legitimize',
  email: 'Karen_Herman62@hotmail.com',
  passportNumber: 'zowie vet',
  jshshir: 'besides gee at',
};

export const sampleWithPartialData: IStudent = {
  id: 18323,
  firstName: 'Marilou',
  lastName: 'Jacobs',
  middleName: 'dearly um',
  gender: 'short-term polarisation',
  birthdate: 'wire awareness irritably',
  email: 'Gene.Stark@gmail.com',
  hemisId: 19116,
  passportNumber: 'whistle seemingly',
  jshshir: 'gut',
  tutionType: 'GRANT',
  nationality: 'extra-large cavernous',
  country: 'Kenya',
  city: 'Weldonberg',
  course: 32410,
  semester: 29582,
};

export const sampleWithFullData: IStudent = {
  id: 3020,
  firstName: 'Agustin',
  lastName: 'Wilderman',
  middleName: 'woot',
  gender: 'overburden menacing',
  birthdate: 'elegantly ick',
  phoneNumber: 'phew modulo',
  email: 'Germaine70@gmail.com',
  hemisId: 26414,
  passportNumber: 'ack',
  jshshir: 'honored',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'coolly',
  country: 'Wallis and Futuna',
  city: 'Leomouth',
  region: 'federate',
  addressLine: 'troubled christen which',
  course: 31619,
  semester: 27443,
  educationLanguage: 'UZBEK',
  educationType: 'KUNDUZGI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Anna',
  lastName: 'Hagenes',
  middleName: 'sniveling challenge',
  gender: 'within',
  birthdate: 'yuck',
  email: 'Raoul94@gmail.com',
  passportNumber: 'plus prioritize verbally',
  jshshir: 'woefully wordy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
