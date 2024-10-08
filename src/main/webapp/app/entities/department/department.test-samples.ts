import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 19448,
};

export const sampleWithPartialData: IDepartment = {
  id: 7446,
};

export const sampleWithFullData: IDepartment = {
  id: 28265,
  name: 'emphasize fiddle',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
