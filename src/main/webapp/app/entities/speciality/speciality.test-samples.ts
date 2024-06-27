import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 1219,
};

export const sampleWithPartialData: ISpeciality = {
  id: 7711,
};

export const sampleWithFullData: ISpeciality = {
  id: 9630,
  name: 'author mediocre repackage',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
