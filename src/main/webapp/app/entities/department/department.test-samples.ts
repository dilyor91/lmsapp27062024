import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 6656,
};

export const sampleWithPartialData: IDepartment = {
  id: 5894,
};

export const sampleWithFullData: IDepartment = {
  id: 1073,
  name: 'oh',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
