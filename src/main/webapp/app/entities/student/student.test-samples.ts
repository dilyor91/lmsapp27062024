import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 25031,
  firstName: 'Shayna',
  lastName: 'Stehr',
  middleName: 'mid agonizing when',
  gender: 'cleverly geez',
  birthdate: 'kindhearted shirtdress',
  email: 'Baylee20@gmail.com',
  passportNumber: 'weak reserve blend',
  jshshir: 'think',
};

export const sampleWithPartialData: IStudent = {
  id: 24813,
  firstName: 'Winona',
  lastName: 'Lindgren',
  middleName: 'since fondly',
  gender: 'regular hourly',
  birthdate: 'personalise queasily',
  phoneNumber: 'but',
  email: 'Nelda.Johnston@hotmail.com',
  passportNumber: 'aide transplantation what',
  jshshir: 'blindly yippee whenever',
  isActive: false,
  tutionType: 'KONTRAKT',
  country: 'Mongolia',
  city: 'Ziemannland',
  addressLine: 'cruelty duck subroutine',
  course: 9604,
  educationLanguage: 'ENGLISH',
  educationType: 'KECHKI',
};

export const sampleWithFullData: IStudent = {
  id: 31719,
  firstName: 'Samantha',
  lastName: 'Mohr',
  middleName: 'mysterious laugh',
  gender: 'cherish in',
  birthdate: 'failing lunchroom',
  phoneNumber: 'minor',
  email: 'Virginie.Green@hotmail.com',
  hemisId: 13070,
  passportNumber: 'clamor up lest',
  jshshir: 'whereas alert circadian',
  isActive: false,
  tutionType: 'GRANT',
  nationality: 'as heirloom walkway',
  country: 'Guinea-Bissau',
  city: 'Bradfordville',
  region: 'on',
  addressLine: 'peek over',
  course: 5828,
  semester: 32688,
  educationLanguage: 'UZBEK',
  educationType: 'KECHKI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Noe',
  lastName: 'Williamson-Volkman',
  middleName: 'rowing decompose',
  gender: 'surprisingly option',
  birthdate: 'whenever interleave incidentally',
  email: 'Glennie.Leannon@hotmail.com',
  passportNumber: 'drink',
  jshshir: 'deadly ah',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
