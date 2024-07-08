import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 26684,
};

export const sampleWithPartialData: IDepartment = {
  id: 11302,
  name: 'hungrily',
};

export const sampleWithFullData: IDepartment = {
  id: 20897,
  name: 'wall angelic',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
