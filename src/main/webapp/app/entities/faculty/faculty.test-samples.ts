import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 2984,
};

export const sampleWithPartialData: IFaculty = {
  id: 14281,
  name: 'pish dish hm',
};

export const sampleWithFullData: IFaculty = {
  id: 1029,
  name: 'confute before deficient',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
