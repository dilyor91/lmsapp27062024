import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 14483,
};

export const sampleWithPartialData: ISpeciality = {
  id: 21561,
};

export const sampleWithFullData: ISpeciality = {
  id: 20568,
  name: 'promise elevator slowly',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
