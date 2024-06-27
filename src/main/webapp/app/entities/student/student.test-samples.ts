import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 7095,
  firstName: 'Kobe',
  lastName: 'Abbott',
  middleName: 'unloosen cultivated reluctantly',
  gender: 'vein',
  birthdate: 'anxious equal',
  email: 'Blaze58@yahoo.com',
  passportNumber: 'until joggle splice',
  jshshir: 'wobbly hopeful what',
};

export const sampleWithPartialData: IStudent = {
  id: 8937,
  firstName: 'Zita',
  lastName: 'Shanahan',
  middleName: 'oh',
  gender: 'watermelon',
  birthdate: 'vivaciously yuck',
  email: 'Ernest43@yahoo.com',
  hemisId: 8124,
  passportNumber: 'furthermore',
  jshshir: 'brightly plumb',
  isActive: false,
  tutionType: 'GRANT',
  country: 'Tunisia',
  course: 12069,
  semester: 10754,
  educationLanguage: 'RUSSIAN',
  educationType: 'KUNDUZGI',
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 32571,
  firstName: 'Dwight',
  lastName: 'Klein',
  middleName: 'beside',
  gender: 'repeatedly oh fearful',
  birthdate: 'once',
  phoneNumber: 'even cruelly',
  email: 'Ricardo.Buckridge@hotmail.com',
  hemisId: 32150,
  passportNumber: 'derrick',
  jshshir: 'aha',
  isActive: true,
  tutionType: 'GRANT',
  nationality: 'darkness',
  country: 'Cyprus',
  city: 'New Lora',
  region: 'calmly red orientation',
  addressLine: 'along which',
  course: 22078,
  semester: 7301,
  educationLanguage: 'ENGLISH',
  educationType: 'KECHKI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Adelbert',
  lastName: 'Larkin',
  middleName: 'login drat',
  gender: 'since canopy',
  birthdate: 'extroverted happily',
  email: 'Ben_Borer83@yahoo.com',
  passportNumber: 'provided outlive',
  jshshir: 'um aside',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
