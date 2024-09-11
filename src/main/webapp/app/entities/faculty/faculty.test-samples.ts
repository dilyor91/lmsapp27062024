import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 27078,
};

export const sampleWithPartialData: IFaculty = {
  id: 25591,
  name: 'near gleefully',
};

export const sampleWithFullData: IFaculty = {
  id: 15989,
  name: 'armchair hotdog',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
