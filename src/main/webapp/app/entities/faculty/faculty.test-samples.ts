import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 23419,
};

export const sampleWithPartialData: IFaculty = {
  id: 1233,
  name: 'circa like numeracy',
};

export const sampleWithFullData: IFaculty = {
  id: 17614,
  name: 'penalise',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
