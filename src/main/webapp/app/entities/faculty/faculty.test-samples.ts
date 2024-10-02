import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 4939,
};

export const sampleWithPartialData: IFaculty = {
  id: 28008,
  name: 'silky brr beyond',
};

export const sampleWithFullData: IFaculty = {
  id: 9446,
  name: 'secondary mould',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
