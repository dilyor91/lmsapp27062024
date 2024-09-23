import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 7627,
};

export const sampleWithPartialData: IFaculty = {
  id: 24686,
};

export const sampleWithFullData: IFaculty = {
  id: 2369,
  name: 'pace delightfully',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
