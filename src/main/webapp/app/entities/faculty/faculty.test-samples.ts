import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 21758,
};

export const sampleWithPartialData: IFaculty = {
  id: 32585,
  name: 'bravely phooey',
};

export const sampleWithFullData: IFaculty = {
  id: 14570,
  name: 'simple',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
