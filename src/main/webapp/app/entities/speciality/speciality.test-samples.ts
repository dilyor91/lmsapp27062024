import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 4648,
};

export const sampleWithPartialData: ISpeciality = {
  id: 23327,
  name: 'fussy within',
};

export const sampleWithFullData: ISpeciality = {
  id: 18443,
  name: 'gee furthermore following',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
