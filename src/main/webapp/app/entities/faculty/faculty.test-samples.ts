import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 26533,
};

export const sampleWithPartialData: IFaculty = {
  id: 2645,
  name: 'actually',
};

export const sampleWithFullData: IFaculty = {
  id: 7971,
  name: 'thump',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
