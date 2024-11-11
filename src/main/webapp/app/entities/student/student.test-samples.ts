import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 2181,
  firstName: 'Madelynn',
  lastName: 'Bauch',
  middleName: 'optimistically unimpressively founder',
  gender: 'uh-huh',
  birthdate: 'knuckle fail marksman',
  email: 'Christine.Flatley@hotmail.com',
  passportNumber: 'step potentially',
  jshshir: 'skateboard onto',
};

export const sampleWithPartialData: IStudent = {
  id: 4499,
  firstName: 'Alejandrin',
  lastName: 'Collier',
  middleName: 'even',
  gender: 'cleave bright oh',
  birthdate: 'if hm',
  email: 'Camden.Hudson@hotmail.com',
  hemisId: 7374,
  passportNumber: 'internationalize skateboard',
  jshshir: 'toward',
  nationality: 'even volleyball sad',
  addressLine: 'until',
  semester: 27776,
  educationType: 'SIRTQI',
};

export const sampleWithFullData: IStudent = {
  id: 26683,
  firstName: 'Ariel',
  lastName: 'Murphy',
  middleName: 'cavernous',
  gender: 'whether',
  birthdate: 'closely oh',
  phoneNumber: 'swing versus cheerfully',
  email: 'Helene.McLaughlin92@gmail.com',
  hemisId: 25018,
  passportNumber: 'bah',
  jshshir: 'newsprint unfinished',
  isActive: true,
  tutionType: 'GRANT',
  nationality: 'brr',
  country: 'Brazil',
  city: 'Blickstad',
  region: 'modulo clear-cut',
  addressLine: 'gigantic different meh',
  course: 4826,
  semester: 52,
  educationLanguage: 'RUSSIAN',
  educationType: 'KECHKI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Vincenza',
  lastName: 'Bashirian',
  middleName: 'whoa clamour',
  gender: 'ugh self-reliant',
  birthdate: 'forenenst',
  email: 'Eunice.Runolfsson-Stoltenberg99@hotmail.com',
  passportNumber: 'as',
  jshshir: 'splosh baptise',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
