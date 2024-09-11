import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 5599,
};

export const sampleWithPartialData: IDepartment = {
  id: 23107,
  name: 'thwart mechanically',
};

export const sampleWithFullData: IDepartment = {
  id: 31942,
  name: 'finally blah',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
