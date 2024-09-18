import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 9347,
};

export const sampleWithPartialData: ISpeciality = {
  id: 17928,
  name: 'gallivant',
};

export const sampleWithFullData: ISpeciality = {
  id: 14208,
  name: 'pasture gown',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
