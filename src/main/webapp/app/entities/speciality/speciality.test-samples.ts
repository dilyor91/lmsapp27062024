import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 27085,
};

export const sampleWithPartialData: ISpeciality = {
  id: 14097,
  name: 'ugh bleakly',
};

export const sampleWithFullData: ISpeciality = {
  id: 17817,
  name: 'avaricious aggressive',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
