import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 1302,
};

export const sampleWithPartialData: IFaculty = {
  id: 3156,
};

export const sampleWithFullData: IFaculty = {
  id: 1580,
  name: 'extremely how',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
