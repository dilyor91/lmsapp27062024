import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 26032,
  firstName: 'Dameon',
  lastName: 'Anderson',
  gender: 'MALE',
  birthdate: 'owlishly',
  email: 'Everette_Bergstrom16@gmail.com',
  passportNumber: 'to if amid',
  jshshir: 'clearly aha',
};

export const sampleWithPartialData: ITeacher = {
  id: 18493,
  firstName: 'Brittany',
  lastName: 'Haley',
  middleName: 'anxiously since enraged',
  gender: 'MALE',
  birthdate: 'inasmuch jovially excitedly',
  phoneNumber: 'for',
  email: 'Grayson.Altenwerth@hotmail.com',
  passportNumber: 'depart spiteful complicated',
  jshshir: 'however',
  region: 'ack synthesise',
  addressLine: 'fairly',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithFullData: ITeacher = {
  id: 28965,
  firstName: 'Rebecca',
  lastName: 'Howe',
  middleName: 'destock when',
  gender: 'MALE',
  birthdate: 'near gift gosh',
  phoneNumber: 'for yum once',
  email: 'Amani54@yahoo.com',
  passportNumber: 'how than zealous',
  jshshir: 'whereas',
  isActive: true,
  nationality: 'tight vivacious',
  country: 'Mongolia',
  city: 'Eden Prairie',
  region: 'saw assist cruelly',
  addressLine: 'doodle',
  position: 'DOTSENT',
  academicDegree: 'ILMIY_DARAJASIZ',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Francisco',
  lastName: 'Considine',
  gender: 'MALE',
  birthdate: 'sociable',
  email: 'Queen.Welch81@gmail.com',
  passportNumber: 'during acknowledge',
  jshshir: 'forecast kissingly fencing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
