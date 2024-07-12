import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 14803,
  firstName: 'Jordane',
  lastName: 'Greenholt',
  middleName: 'everybody',
  gender: 'isolation finally',
  birthdate: 'yuck blaspheme vice',
  email: 'Michale27@hotmail.com',
  passportNumber: 'but',
  jshshir: 'cymbal inwardly gracefully',
};

export const sampleWithPartialData: IStudent = {
  id: 4739,
  firstName: 'Warren',
  lastName: 'Schroeder',
  middleName: 'gee pollutant smell',
  gender: 'glamorize helplessly',
  birthdate: 'unfreeze oh',
  phoneNumber: 'nicely',
  email: 'Reggie.Hirthe@yahoo.com',
  hemisId: 16454,
  passportNumber: 'meh',
  jshshir: 'phew ick',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'energetically astride',
  city: 'Brianastead',
  region: 'amid lava remit',
  semester: 23455,
  educationLanguage: 'ENGLISH',
  educationType: 'KECHKI',
};

export const sampleWithFullData: IStudent = {
  id: 23407,
  firstName: 'Tatyana',
  lastName: 'Ferry-Block',
  middleName: 'angry promptly',
  gender: 'supposing between',
  birthdate: 'carelessly',
  phoneNumber: 'preclude boohoo mold',
  email: 'Maryse98@gmail.com',
  hemisId: 30929,
  passportNumber: 'why',
  jshshir: 'baggy after',
  isActive: false,
  tutionType: 'GRANT',
  nationality: 'lest sight',
  country: 'Iceland',
  city: 'Loweview',
  region: 'deceivingly brr',
  addressLine: 'bah justly',
  course: 7996,
  semester: 3,
  educationLanguage: 'UZBEK',
  educationType: 'KECHKI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Geraldine',
  lastName: 'Gerlach',
  middleName: 'decisive lest',
  gender: 'cute',
  birthdate: 'besides at if',
  email: 'Ella.Fay62@gmail.com',
  passportNumber: 'than fooey',
  jshshir: 'chafe flawless plus',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
