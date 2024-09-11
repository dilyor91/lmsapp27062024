import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 22904,
};

export const sampleWithPartialData: ISpeciality = {
  id: 15964,
};

export const sampleWithFullData: ISpeciality = {
  id: 10755,
  name: 'instrumentalist vibrate',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
