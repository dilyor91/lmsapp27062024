import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 7063,
  firstName: 'Santos',
  lastName: 'Leuschke',
  middleName: 'fooey methodology',
  gender: 'oof',
  birthdate: 'towards jellyfish quarrelsomely',
  email: 'Nya_Ernser37@gmail.com',
  passportNumber: 'or upon',
  jshshir: 'reef pfft',
};

export const sampleWithPartialData: IStudent = {
  id: 9680,
  firstName: 'Jefferey',
  lastName: 'Rice',
  middleName: 'information depend',
  gender: 'ha willow',
  birthdate: 'happily sore',
  email: 'Maeve_Corwin@gmail.com',
  hemisId: 12147,
  passportNumber: 'likewise spell daintily',
  jshshir: 'pfft',
  tutionType: 'KONTRAKT',
  nationality: 'per',
  country: 'Turkmenistan',
  city: 'East Giovannyport',
  region: 'mid arrow',
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 17628,
  firstName: 'Roxane',
  lastName: 'Mueller-Jaskolski',
  middleName: 'sane wealthy amongst',
  gender: 'despite er',
  birthdate: 'expect film amidst',
  phoneNumber: 'halloo meh',
  email: 'Lance_Rutherford@gmail.com',
  hemisId: 22659,
  passportNumber: 'duh angrily',
  jshshir: 'scan',
  isActive: true,
  tutionType: 'GRANT',
  nationality: 'referendum whole tidy',
  country: 'Liberia',
  city: 'Rock Hill',
  region: 'negative',
  addressLine: 'cheddar sardonic',
  course: 5073,
  semester: 26051,
  educationLanguage: 'ENGLISH',
  educationType: 'KECHKI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Adan',
  lastName: 'Runte',
  middleName: 'integral when sleepily',
  gender: 'till unrealistic',
  birthdate: 'gah upwardly',
  email: 'Donnell_Nitzsche84@gmail.com',
  passportNumber: 'overwhelm uh-huh',
  jshshir: 'router',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
