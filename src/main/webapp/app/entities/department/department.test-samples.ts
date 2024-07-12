import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 3592,
};

export const sampleWithPartialData: IDepartment = {
  id: 6026,
};

export const sampleWithFullData: IDepartment = {
  id: 25216,
  name: 'freckle international willfully',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
