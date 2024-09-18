import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 14308,
};

export const sampleWithPartialData: IDepartment = {
  id: 8458,
};

export const sampleWithFullData: IDepartment = {
  id: 16204,
  name: 'instead',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
