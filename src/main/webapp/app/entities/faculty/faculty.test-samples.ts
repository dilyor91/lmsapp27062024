import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 11364,
};

export const sampleWithPartialData: IFaculty = {
  id: 12735,
  name: 'gah',
};

export const sampleWithFullData: IFaculty = {
  id: 20522,
  name: 'phew whenever',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
