import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 27086,
};

export const sampleWithPartialData: ISpeciality = {
  id: 2225,
};

export const sampleWithFullData: ISpeciality = {
  id: 26884,
  name: 'drat',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
