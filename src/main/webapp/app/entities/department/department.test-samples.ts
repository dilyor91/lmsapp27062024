import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 1814,
};

export const sampleWithPartialData: IDepartment = {
  id: 28731,
};

export const sampleWithFullData: IDepartment = {
  id: 32213,
  name: 'fudge optimal even',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
