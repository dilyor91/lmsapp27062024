import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 10660,
};

export const sampleWithPartialData: IDepartment = {
  id: 28777,
};

export const sampleWithFullData: IDepartment = {
  id: 8279,
  name: 'where',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
