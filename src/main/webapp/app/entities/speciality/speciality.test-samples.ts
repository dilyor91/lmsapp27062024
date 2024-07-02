import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 27593,
};

export const sampleWithPartialData: ISpeciality = {
  id: 17232,
  name: 'astride',
};

export const sampleWithFullData: ISpeciality = {
  id: 12330,
  name: 'catch hence',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
