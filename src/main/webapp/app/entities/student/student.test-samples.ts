import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 12005,
  firstName: 'Turner',
  lastName: 'Mertz',
  middleName: 'upwardly woolens huzzah',
  gender: 'gadzooks',
  birthdate: 'nautical however courteous',
  email: 'Cornell.Rodriguez30@hotmail.com',
  passportNumber: 'sleepily corny',
  jshshir: 'glamorise wherever',
};

export const sampleWithPartialData: IStudent = {
  id: 5248,
  firstName: 'Abdiel',
  lastName: 'Balistreri',
  middleName: 'bankrupt randomisation den',
  gender: 'tipple cope',
  birthdate: 'crafty on',
  phoneNumber: 'whose fallacy',
  email: 'Lucienne_Baumbach31@yahoo.com',
  passportNumber: 'promptly',
  jshshir: 'however though yearly',
  isActive: true,
  nationality: 'aw utterly where',
  country: 'French Southern Territories',
  region: 'spiteful',
  addressLine: 'fox flanker',
  educationType: 'KUNDUZGI',
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 27518,
  firstName: 'Leilani',
  lastName: 'McDermott',
  middleName: 'unfolded',
  gender: 'once',
  birthdate: 'phew woot titivate',
  phoneNumber: 'likewise',
  email: 'Parker.Treutel@hotmail.com',
  hemisId: 3026,
  passportNumber: 'furthermore',
  jshshir: 'yowza',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'pace',
  country: 'Madagascar',
  city: 'Lake Morrisborough',
  region: 'gosh',
  addressLine: 'aw wrestler',
  course: 4603,
  semester: 3680,
  educationLanguage: 'RUSSIAN',
  educationType: 'KUNDUZGI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Camylle',
  lastName: 'Johnston',
  middleName: 'boohoo godparent',
  gender: 'dance whereas woot',
  birthdate: 'puzzled pish',
  email: 'Lawrence.Jacobs@yahoo.com',
  passportNumber: 'officially personal nettle',
  jshshir: 'bah froth eviction',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
