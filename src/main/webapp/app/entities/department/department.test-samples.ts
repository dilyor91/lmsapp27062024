import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 16085,
};

export const sampleWithPartialData: IDepartment = {
  id: 18907,
};

export const sampleWithFullData: IDepartment = {
  id: 29729,
  name: 'reproachfully interleave',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
