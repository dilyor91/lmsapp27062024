import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 31863,
};

export const sampleWithPartialData: ISpeciality = {
  id: 22800,
  name: 'phooey though boohoo',
};

export const sampleWithFullData: ISpeciality = {
  id: 23931,
  name: 'furthermore',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
