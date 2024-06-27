import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 1938,
};

export const sampleWithPartialData: IFaculty = {
  id: 26079,
};

export const sampleWithFullData: IFaculty = {
  id: 10305,
  name: 'buzz',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
