import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 15095,
};

export const sampleWithPartialData: IDepartment = {
  id: 8532,
};

export const sampleWithFullData: IDepartment = {
  id: 26086,
  name: 'and',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
