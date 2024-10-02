import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 13936,
};

export const sampleWithPartialData: ISpeciality = {
  id: 16809,
};

export const sampleWithFullData: ISpeciality = {
  id: 31086,
  name: 'snappy brr trouser',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
