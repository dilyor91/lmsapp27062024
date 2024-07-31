import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 13943,
};

export const sampleWithPartialData: IFaculty = {
  id: 27043,
};

export const sampleWithFullData: IFaculty = {
  id: 1276,
  name: 'outclass unto',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
