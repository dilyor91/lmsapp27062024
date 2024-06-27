import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 8243,
};

export const sampleWithPartialData: IDepartment = {
  id: 18143,
};

export const sampleWithFullData: IDepartment = {
  id: 22540,
  name: 'panda ah who',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
