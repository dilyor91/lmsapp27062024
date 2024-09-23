import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 2775,
};

export const sampleWithPartialData: ISpeciality = {
  id: 26880,
};

export const sampleWithFullData: ISpeciality = {
  id: 12131,
  name: 'against',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
