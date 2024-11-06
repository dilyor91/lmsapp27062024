import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: 5779,
};

export const sampleWithPartialData: ISpeciality = {
  id: 17761,
  name: 'new golden',
};

export const sampleWithFullData: ISpeciality = {
  id: 18170,
  name: 'phew under entomb',
};

export const sampleWithNewData: NewSpeciality = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
