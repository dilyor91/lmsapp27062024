import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 903,
  firstName: 'Jeremie',
  lastName: 'Jacobs',
  gender: 'MALE',
  birthdate: 'godfather',
  email: 'Loyal51@yahoo.com',
  passportNumber: 'graduate minister',
  jshshir: 'yippee exotic',
};

export const sampleWithPartialData: ITeacher = {
  id: 12215,
  firstName: 'Tyler',
  lastName: 'Nikolaus',
  gender: 'FEMALE',
  birthdate: 'painfully psst silky',
  phoneNumber: 'colorfully',
  email: 'Roselyn.Towne3@gmail.com',
  passportNumber: 'psst er whereas',
  jshshir: 'duh meh merge',
  isActive: false,
  addressLine: 'profane hearten',
  position: 'KAFEDRA_MUDIRI',
};

export const sampleWithFullData: ITeacher = {
  id: 11560,
  firstName: 'Timmy',
  lastName: 'Satterfield',
  middleName: 'cram',
  gender: 'MALE',
  birthdate: 'whoa',
  phoneNumber: 'tempting however smoothly',
  email: 'Devonte76@hotmail.com',
  passportNumber: 'draft',
  jshshir: 'above appropriate maul',
  isActive: false,
  nationality: 'gosh',
  country: 'Germany',
  city: 'Watsicafort',
  region: 'uselessly porter',
  addressLine: 'indeed openly',
  position: 'PROFESSOR',
  academicDegree: 'PHD',
  academicTitle: 'DOTSENT',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Henri',
  lastName: 'Goldner',
  gender: 'MALE',
  birthdate: 'smart pigpen',
  email: 'Emmett11@yahoo.com',
  passportNumber: 'but',
  jshshir: 'yahoo parade mundane',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
