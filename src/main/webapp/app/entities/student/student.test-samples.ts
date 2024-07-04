import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 13244,
  firstName: 'Polly',
  lastName: 'Rice',
  middleName: 'lovable',
  gender: 'of relive',
  birthdate: 'province whereas',
  email: 'Kiarra.Kuhlman@yahoo.com',
  passportNumber: 'at epee helplessly',
  jshshir: 'benchmark oh',
};

export const sampleWithPartialData: IStudent = {
  id: 13594,
  firstName: 'Letitia',
  lastName: 'Pollich',
  middleName: 'until gherkin anenst',
  gender: 'snarling until derby',
  birthdate: 'officially whoever',
  email: 'Nikita.Schumm@yahoo.com',
  passportNumber: 'dismal yowza bah',
  jshshir: 'boastfully',
  isActive: false,
  tutionType: 'GRANT',
  nationality: 'underestimation',
  country: 'Tokelau',
  city: 'North Highlands',
  course: 30998,
  semester: 10923,
  educationForm: 'BAKALAVR',
};

export const sampleWithFullData: IStudent = {
  id: 32288,
  firstName: 'Celine',
  lastName: 'Paucek',
  middleName: 'whoa chilly',
  gender: 'arrogantly',
  birthdate: 'enshrine',
  phoneNumber: 'sheepishly provided',
  email: 'Rashad98@yahoo.com',
  hemisId: 5781,
  passportNumber: 'witty',
  jshshir: 'drat whenever livid',
  isActive: true,
  tutionType: 'GRANT',
  nationality: 'hydrocarb adult washbasin',
  country: 'Slovenia',
  city: 'Durganboro',
  region: 'scrub winged often',
  addressLine: 'quit mortified jewel',
  course: 7252,
  semester: 25214,
  educationLanguage: 'UZBEK',
  educationType: 'SIRTQI',
  educationForm: 'MAGISTR',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Maryse',
  lastName: 'Wiza',
  middleName: 'memorable oddly along',
  gender: 'excepting restfully',
  birthdate: 'terminology whereas beside',
  email: 'Stewart.Bode73@gmail.com',
  passportNumber: 'erase',
  jshshir: 'wherever beg',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
