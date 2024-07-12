import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 9958,
};

export const sampleWithPartialData: IFaculty = {
  id: 2350,
  name: 'officially positively',
};

export const sampleWithFullData: IFaculty = {
  id: 15204,
  name: 'weakly',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
