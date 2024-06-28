import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 198,
};

export const sampleWithPartialData: IDepartment = {
  id: 19782,
};

export const sampleWithFullData: IDepartment = {
  id: 1285,
  name: 'er cultivate',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
