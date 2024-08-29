import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 3147,
};

export const sampleWithPartialData: IDepartment = {
  id: 7291,
  name: 'wherever',
};

export const sampleWithFullData: IDepartment = {
  id: 9726,
  name: 'careen ecstatic explore',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
