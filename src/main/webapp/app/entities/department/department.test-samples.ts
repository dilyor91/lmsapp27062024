import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 15852,
};

export const sampleWithPartialData: IDepartment = {
  id: 29493,
  name: 'terrorise',
};

export const sampleWithFullData: IDepartment = {
  id: 13118,
  name: 'gah concerning including',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
