import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 11535,
};

export const sampleWithPartialData: ISpeciality = {
  id: 3018,
};

export const sampleWithFullData: ISpeciality = {
  id: 11232,
  name: 'vice axis loosen',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
