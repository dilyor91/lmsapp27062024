import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 10877,
};

export const sampleWithPartialData: ISpeciality = {
  id: 20237,
  name: 'inside',
};

export const sampleWithFullData: ISpeciality = {
  id: 29108,
  name: 'quietly considering',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
