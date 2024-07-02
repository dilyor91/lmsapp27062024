import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 4876,
};

export const sampleWithPartialData: IFaculty = {
  id: 552,
};

export const sampleWithFullData: IFaculty = {
  id: 9079,
  name: 'researches memorise',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
