import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 9226,
};

export const sampleWithPartialData: IFaculty = {
  id: 32172,
  name: 'blissfully now notwithstanding',
};

export const sampleWithFullData: IFaculty = {
  id: 260,
  name: 'boo',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
