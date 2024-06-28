import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 7408,
};

export const sampleWithPartialData: IFaculty = {
  id: 7051,
  name: 'phew yowza',
};

export const sampleWithFullData: IFaculty = {
  id: 20162,
  name: 'tailspin',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
