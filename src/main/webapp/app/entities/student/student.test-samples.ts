import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 31362,
  firstName: 'Zita',
  lastName: 'Crona',
  middleName: 'reproachfully while',
  gender: 'hastily co-producer',
  birthdate: 'carp and',
  email: 'Genevieve_Bechtelar@hotmail.com',
  passportNumber: 'righteously ample rightfully',
  jshshir: 'home icy now',
};

export const sampleWithPartialData: IStudent = {
  id: 32713,
  firstName: 'Ariane',
  lastName: 'Lebsack',
  middleName: 'plus against',
  gender: 'with',
  birthdate: 'mmm windy',
  email: 'Macie65@hotmail.com',
  hemisId: 24164,
  passportNumber: 'around',
  jshshir: 'lawmaker doubtfully',
  country: 'Finland',
  educationForm: 'MAGISTR',
};

export const sampleWithFullData: IStudent = {
  id: 21412,
  firstName: 'Suzanne',
  lastName: 'Mohr',
  middleName: 'shrill tame',
  gender: 'whether',
  birthdate: 'smooth because',
  phoneNumber: 'yum instead',
  email: 'Gaetano_Bins@hotmail.com',
  hemisId: 9713,
  passportNumber: 'internationalize newsprint',
  jshshir: 'essence vice',
  isActive: false,
  tutionType: 'GRANT',
  nationality: 'deselect',
  country: 'Monaco',
  city: 'East Susieside',
  region: 'next',
  addressLine: 'around',
  course: 8140,
  semester: 18643,
  educationLanguage: 'ENGLISH',
  educationType: 'KUNDUZGI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Violette',
  lastName: 'Wiza',
  middleName: 'versus',
  gender: 'membership kaleidoscopic sturdy',
  birthdate: 'crank oddly drive',
  email: 'Roger.Auer@yahoo.com',
  passportNumber: 'iterate greedily shyly',
  jshshir: 'subsidy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
