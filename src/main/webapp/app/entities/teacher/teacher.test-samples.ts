import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 25937,
  firstName: 'Jeanie',
  lastName: "O'Reilly-Boyle",
  gender: 'MALE',
  birthdate: 'moist',
  email: 'Bryana_Marvin67@gmail.com',
  passportNumber: 'snoopy',
  jshshir: 'cast loose',
};

export const sampleWithPartialData: ITeacher = {
  id: 1016,
  firstName: 'Hilario',
  lastName: 'Bahringer',
  gender: 'MALE',
  birthdate: 'pulverize',
  email: 'Hallie_Runolfsdottir58@yahoo.com',
  passportNumber: 'rapidly',
  jshshir: 'abaft pro',
  country: 'Cayman Islands',
  region: 'outlandish endive with',
  addressLine: 'furiously custody',
  position: 'DOTSENT',
};

export const sampleWithFullData: ITeacher = {
  id: 5281,
  firstName: 'Nakia',
  lastName: 'Dietrich',
  middleName: 'spicy jovial yippee',
  gender: 'MALE',
  birthdate: 'blissfully',
  phoneNumber: 'bark',
  email: 'Elliott.Schmidt10@gmail.com',
  passportNumber: 'tot to underneath',
  jshshir: 'at skeletal troop',
  isActive: false,
  nationality: 'like if',
  country: 'Maldives',
  city: 'Pagacton',
  region: 'ordinary often',
  addressLine: 'because pricey ha',
  position: 'PROFESSOR',
  academicDegree: 'PHD',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Nina',
  lastName: 'Spinka',
  gender: 'MALE',
  birthdate: 'leather this',
  email: 'Rosella.Zulauf55@yahoo.com',
  passportNumber: 'brr thankfully soft',
  jshshir: 'wince',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
