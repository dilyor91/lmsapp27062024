import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 11963,
};

export const sampleWithPartialData: IFaculty = {
  id: 4746,
};

export const sampleWithFullData: IFaculty = {
  id: 21380,
  name: 'compassionate',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
