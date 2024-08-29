import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 3405,
};

export const sampleWithPartialData: ISpeciality = {
  id: 1210,
};

export const sampleWithFullData: ISpeciality = {
  id: 7775,
  name: 'outfielder gosh excepting',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
