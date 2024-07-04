import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 12716,
};

export const sampleWithPartialData: IFaculty = {
  id: 26403,
};

export const sampleWithFullData: IFaculty = {
  id: 11477,
  name: 'servitude if',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
