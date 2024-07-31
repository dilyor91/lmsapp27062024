import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 28077,
  firstName: 'Meghan',
  lastName: 'Stehr',
  middleName: 'phew',
  gender: 'courageously',
  birthdate: 'lightly sparse',
  email: 'Kip81@hotmail.com',
  passportNumber: 'abnormally hospitalisation',
  jshshir: 'elderly people',
};

export const sampleWithPartialData: IStudent = {
  id: 1007,
  firstName: 'Edward',
  lastName: 'Reinger',
  middleName: 'woot where',
  gender: 'by',
  birthdate: 'round',
  email: 'Leatha_Littel@hotmail.com',
  hemisId: 26157,
  passportNumber: 'meager about',
  jshshir: 'stupendous',
  isActive: true,
  tutionType: 'KONTRAKT',
  nationality: 'vengeful if brr',
  region: 'since terribly',
  educationLanguage: 'RUSSIAN',
};

export const sampleWithFullData: IStudent = {
  id: 3114,
  firstName: 'Jordy',
  lastName: 'Ward',
  middleName: 'cuddly about upon',
  gender: 'spite powder',
  birthdate: 'between',
  phoneNumber: 'clavier yippee',
  email: 'Avery.Durgan@yahoo.com',
  hemisId: 24663,
  passportNumber: 'unlike necessary',
  jshshir: 'carelessly delegate',
  isActive: false,
  tutionType: 'KONTRAKT',
  nationality: 'yowza',
  country: 'Venezuela',
  city: 'Lake Shermanboro',
  region: 'percent authentic yippee',
  addressLine: 'off station than',
  course: 17421,
  semester: 9467,
  educationLanguage: 'UZBEK',
  educationType: 'KECHKI',
  educationForm: 'BAKALAVR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Ezequiel',
  lastName: 'Denesik',
  middleName: 'unpleasant',
  gender: 'eventually patronize',
  birthdate: 'unlined spanish',
  email: 'Crystal.Bergstrom@gmail.com',
  passportNumber: 'shoddy domain',
  jshshir: 'amongst',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
