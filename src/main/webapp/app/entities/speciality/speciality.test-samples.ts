import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 27573,
};

export const sampleWithPartialData: ISpeciality = {
  id: 26788,
  name: 'sandal redraw where',
};

export const sampleWithFullData: ISpeciality = {
  id: 19363,
  name: 'terrific boxspring',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
