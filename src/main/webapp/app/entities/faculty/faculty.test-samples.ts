import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 11124,
};

export const sampleWithPartialData: IFaculty = {
  id: 17887,
};

export const sampleWithFullData: IFaculty = {
  id: 12477,
  name: 'scarily likewise',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
