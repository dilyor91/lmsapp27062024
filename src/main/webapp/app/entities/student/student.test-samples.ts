import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 2082,
  firstName: 'Sienna',
  lastName: 'Spinka',
  middleName: 'helplessly draught',
  gender: 'whirlpool youthfully snooker',
  birthdate: 'pocket phooey',
  email: 'Chad.Lind15@gmail.com',
  passportNumber: 'worth honorable huzzah',
  jshshir: 'including chestnut',
};

export const sampleWithPartialData: IStudent = {
  id: 24443,
  firstName: 'Moses',
  lastName: 'Padberg',
  middleName: 'pod flour even',
  gender: 'ack',
  birthdate: 'parlay indeed gracefully',
  phoneNumber: 'presentation supposing',
  email: 'Jerod53@gmail.com',
  passportNumber: 'ack drat',
  jshshir: 'macrame gullible inasmuch',
  nationality: 'instructive whose',
  country: 'Andorra',
  city: 'Pinkiebury',
  region: 'ha',
  educationType: 'SIRTQI',
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 19857,
  firstName: 'Kellie',
  lastName: 'Pollich',
  middleName: 'standard quantify',
  gender: 'after times',
  birthdate: 'cub dish next',
  phoneNumber: 'like havoc',
  email: 'Rhea.Koelpin@yahoo.com',
  hemisId: 30162,
  passportNumber: 'although',
  jshshir: 'gadzooks furiously disbar',
  isActive: false,
  tutionType: 'GRANT',
  nationality: 'attempt querulous',
  country: 'Norfolk Island',
  city: 'Fort Maida',
  region: 'ack anarchy fit',
  addressLine: 'on',
  course: 18660,
  semester: 15712,
  educationLanguage: 'RUSSIAN',
  educationType: 'SIRTQI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Zander',
  lastName: 'Pollich',
  middleName: 'whenever as beside',
  gender: 'considering contort modest',
  birthdate: 'airbrush',
  email: 'Winnifred_Marks@hotmail.com',
  passportNumber: 'beside',
  jshshir: 'off',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
