import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 18745,
  firstName: 'Lucious',
  lastName: 'Denesik',
  gender: 'FEMALE',
  birthdate: 'educated',
  email: 'Kelsi.Huels10@yahoo.com',
  passportNumber: 'that',
  jshshir: 'whether',
};

export const sampleWithPartialData: ITeacher = {
  id: 24285,
  firstName: 'Jarred',
  lastName: 'Tillman',
  gender: 'FEMALE',
  birthdate: 'hmph',
  email: 'Christop_Hoeger@hotmail.com',
  passportNumber: 'upwardly',
  jshshir: 'or overload celebrated',
  country: 'Austria',
  city: 'Clearwater',
  addressLine: 'ick likewise natural',
  academicDegree: 'FAN_DOCTORI',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithFullData: ITeacher = {
  id: 7752,
  firstName: 'Kavon',
  lastName: 'Senger',
  middleName: 'owlishly recent',
  gender: 'FEMALE',
  birthdate: 'owlishly throughout',
  phoneNumber: 'veneer avocado hurdle',
  email: 'Tyreek_Spencer@gmail.com',
  passportNumber: 'huzzah',
  jshshir: 'chilly',
  isActive: true,
  nationality: 'lumpy',
  country: 'Netherlands',
  city: 'Burlington',
  region: 'pottery brownie how',
  addressLine: 'finally busy',
  position: 'DOTSENT',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'DOTSENT',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Nasir',
  lastName: 'Hartmann',
  gender: 'MALE',
  birthdate: 'woot granola thoughtful',
  email: 'Ted_Schuster@hotmail.com',
  passportNumber: 'cautiously frantically',
  jshshir: 'supposing ick',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
