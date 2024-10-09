import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 2543,
  firstName: 'Darrin',
  lastName: 'Fritsch',
  gender: 'FEMALE',
  birthdate: 'hm apud',
  email: 'Isac.Tillman98@hotmail.com',
  passportNumber: 'hm miserable aboard',
  jshshir: 'ugh behind',
};

export const sampleWithPartialData: ITeacher = {
  id: 24434,
  firstName: 'Annabelle',
  lastName: 'Kuhic-Johnston',
  gender: 'FEMALE',
  birthdate: 'zowie from',
  email: 'Ciara22@gmail.com',
  passportNumber: 'how own',
  jshshir: 'mutate abaft',
  nationality: 'gosh',
  country: 'Cook Islands',
  region: 'slowly dishearten chainstay',
  academicDegree: 'PHD',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithFullData: ITeacher = {
  id: 70,
  firstName: 'Regan',
  lastName: 'Parker',
  middleName: 'zealous spectacles aha',
  gender: 'FEMALE',
  birthdate: 'if',
  phoneNumber: 'worth',
  email: 'Raven_Kling70@gmail.com',
  passportNumber: 'pish worthwhile',
  jshshir: 'though fooey',
  isActive: true,
  nationality: 'candid than mummify',
  country: 'Northern Mariana Islands',
  city: 'Fort Christianamouth',
  region: 'knowledgeably including denitrify',
  addressLine: 'oh enormously overstay',
  position: 'KAFEDRA_MUDIRI',
  academicDegree: 'PHD',
  academicTitle: 'ILMIY_UNVONSIZ',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'Lucious',
  lastName: 'Kulas',
  gender: 'MALE',
  birthdate: 'meh why ah',
  email: 'Isadore_Kutch@hotmail.com',
  passportNumber: 'drat mallard',
  jshshir: 'minus willfully jealous',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
