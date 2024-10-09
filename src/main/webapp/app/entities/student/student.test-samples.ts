import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 10365,
  firstName: 'Kaley',
  lastName: 'Bogisich',
  middleName: 'modulo wherever ruin',
  gender: 'governance cruelly very',
  birthdate: 'perspire travel',
  email: 'Clarabelle_Tillman@gmail.com',
  passportNumber: 'thorough joyously',
  jshshir: 'since',
};

export const sampleWithPartialData: IStudent = {
  id: 22778,
  firstName: 'Dessie',
  lastName: 'Ruecker',
  middleName: 'tinderbox upside-down',
  gender: 'redact oh',
  birthdate: 'save',
  email: 'Pamela_Mosciski@gmail.com',
  passportNumber: 'scared',
  jshshir: 'pick gum',
  isActive: false,
  tutionType: 'GRANT',
  city: 'East Jaclyn',
  region: 'wrong while',
  course: 2764,
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 13174,
  firstName: 'Carlie',
  lastName: 'Cronin',
  middleName: 'close',
  gender: 'lazily before',
  birthdate: 'for sweetly',
  phoneNumber: 'forenenst',
  email: 'Al.Heathcote10@yahoo.com',
  hemisId: 24959,
  passportNumber: 'for',
  jshshir: 'punctually order',
  isActive: true,
  tutionType: 'GRANT',
  nationality: 'wisely because round',
  country: 'Holy See (Vatican City State)',
  city: 'Konopelskishire',
  region: 'times grown',
  addressLine: 'since',
  course: 5105,
  semester: 10531,
  educationLanguage: 'ENGLISH',
  educationType: 'KUNDUZGI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Joy',
  lastName: 'Orn',
  middleName: 'failing jealously',
  gender: 'gee thin hoick',
  birthdate: 'dash hope equate',
  email: 'Letha.Krajcik@yahoo.com',
  passportNumber: 'insistent glisten',
  jshshir: 'below',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
