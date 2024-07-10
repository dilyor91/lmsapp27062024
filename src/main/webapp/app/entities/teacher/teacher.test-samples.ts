import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 10330,
  firstName: 'Angela',
  lastName: 'Jones',
  gender: 'MALE',
  birthdate: 'clamor',
  email: 'Brigitte34@yahoo.com',
  passportNumber: 'ravioli choke',
  jshshir: 'messy forenenst',
};

export const sampleWithPartialData: ITeacher = {
  id: 2548,
  firstName: 'Freida',
  lastName: 'Reinger',
  gender: 'FEMALE',
  birthdate: 'invalid hence',
  email: 'Arvid_Conroy30@hotmail.com',
  passportNumber: 'sheepishly',
  jshshir: 'moralize against ick',
  isActive: true,
  nationality: 'tender ouch',
  city: 'South Heatherfort',
  region: 'pro yieldingly compress',
  addressLine: 'ape um whose',
  position: 'KAFEDRA_MUDIRI',
  academicTitle: 'PROFESSOR',
};

export const sampleWithFullData: ITeacher = {
  id: 29503,
  firstName: 'Remington',
  lastName: 'Gutkowski',
  middleName: 'monitor vaguely',
  gender: 'FEMALE',
  birthdate: 'following',
  phoneNumber: 'quicker lest',
  email: 'Kellie_Howe13@hotmail.com',
  passportNumber: 'failing suss once',
  jshshir: 'enchanted fertilizer',
  isActive: false,
  nationality: 'actually black handmade',
  country: 'Afghanistan',
  city: 'East Felipaworth',
  region: 'gosh disruption',
  addressLine: 'plus insecure nor',
  position: 'ASSISTENT',
  academicDegree: 'FAN_DOCTORI',
  academicTitle: 'PROFESSOR',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Derrick',
  lastName: 'Moen',
  gender: 'MALE',
  birthdate: 'blindly',
  email: 'Mikayla_Rogahn17@gmail.com',
  passportNumber: 'consequently meanwhile offbeat',
  jshshir: 'ew walrus',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
