import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 16734,
  firstName: 'Louisa',
  lastName: 'Runte',
  middleName: 'rarely',
  gender: 'compromise phew',
  birthdate: 'doting',
  email: 'Donald.Fadel14@gmail.com',
  passportNumber: 'geez',
  jshshir: 'institute unfurl grass',
};

export const sampleWithPartialData: IStudent = {
  id: 25288,
  firstName: 'Kristofer',
  lastName: 'Abernathy',
  middleName: 'concrete physical other',
  gender: 'psst above',
  birthdate: 'whereas joyfully',
  phoneNumber: 'although swerve',
  email: 'Citlalli53@hotmail.com',
  passportNumber: 'leap too ruin',
  jshshir: 'altruistic',
  nationality: 'jumbo',
  city: 'West Gwendolynboro',
  educationType: 'SIRTQI',
  educationForm: 'MAGISTR',
};

export const sampleWithFullData: IStudent = {
  id: 25934,
  firstName: 'Louie',
  lastName: 'Klein',
  middleName: 'by smoothly',
  gender: 'astride',
  birthdate: 'mediocre sedately lieu',
  phoneNumber: 'atop garrote',
  email: 'Curtis_McClure@gmail.com',
  hemisId: 30522,
  passportNumber: 'pave',
  jshshir: 'pfft toothpick yum',
  isActive: true,
  tutionType: 'KONTRAKT',
  nationality: 'verve',
  country: 'Cuba',
  city: 'Adityaland',
  region: 'preregister',
  addressLine: 'suburban partridge',
  course: 22367,
  semester: 12153,
  educationLanguage: 'ENGLISH',
  educationType: 'KUNDUZGI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Jaclyn',
  lastName: 'Abbott',
  middleName: 'entwine mill space',
  gender: 'until tinted',
  birthdate: 'demob junior for',
  email: 'Torrance_Beahan@hotmail.com',
  passportNumber: 'quicker woot',
  jshshir: 'celebrate outlaw',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
