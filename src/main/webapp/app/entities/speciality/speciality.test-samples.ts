import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 4068,
};

export const sampleWithPartialData: ISpeciality = {
  id: 14583,
  name: 'fame cautiously annually',
};

export const sampleWithFullData: ISpeciality = {
  id: 17918,
  name: 'which reappear',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
