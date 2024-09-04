import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 5857,
  firstName: 'Trever',
  lastName: 'Monahan',
  middleName: 'athwart calculation to',
  gender: 'enrage loftily',
  birthdate: 'circa',
  email: 'Creola.Will@yahoo.com',
  passportNumber: 'gah deceivingly now',
  jshshir: 'so ouch',
};

export const sampleWithPartialData: IStudent = {
  id: 7716,
  firstName: 'Keara',
  lastName: 'Cassin',
  middleName: 'fatally',
  gender: 'anenst lawmaker',
  birthdate: 'engage hyena beneath',
  phoneNumber: 'until',
  email: 'Alaina.Schinner@gmail.com',
  hemisId: 16800,
  passportNumber: 'consequently ugh on',
  jshshir: 'politician huzzah',
  tutionType: 'GRANT',
  nationality: 'broadly hmph ouch',
  region: 'throughout',
  addressLine: 'instantly huzzah',
  semester: 3761,
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 20670,
  firstName: 'Bridget',
  lastName: "O'Keefe",
  middleName: 'ugh crayon prioritize',
  gender: 'sans meanwhile',
  birthdate: 'ashamed victory',
  phoneNumber: 'sourwood inasmuch gadzooks',
  email: 'Catherine48@hotmail.com',
  hemisId: 31217,
  passportNumber: 'photodiode bottom-line',
  jshshir: 'knottily urgently',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'underneath joshingly',
  country: 'Iraq',
  city: 'Fort Dereckfield',
  region: 'while',
  addressLine: 'often hide pfft',
  course: 7985,
  semester: 25699,
  educationLanguage: 'ENGLISH',
  educationType: 'SIRTQI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Juanita',
  lastName: 'Reichert',
  middleName: 'tenderise',
  gender: 'droopy',
  birthdate: 'meanwhile turbulent stealthily',
  email: 'Shirley79@gmail.com',
  passportNumber: 'throughout elderly almost',
  jshshir: 'cuddly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
