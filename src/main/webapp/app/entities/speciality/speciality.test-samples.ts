import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 21867,
};

export const sampleWithPartialData: ISpeciality = {
  id: 6226,
};

export const sampleWithFullData: ISpeciality = {
  id: 21554,
  name: 'mmm ha indeed',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
