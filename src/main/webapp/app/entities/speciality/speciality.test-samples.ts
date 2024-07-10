import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 5324,
};

export const sampleWithPartialData: ISpeciality = {
  id: 25367,
};

export const sampleWithFullData: ISpeciality = {
  id: 3939,
  name: 'patiently hence blur',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
