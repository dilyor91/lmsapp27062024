import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 19275,
};

export const sampleWithPartialData: IDepartment = {
  id: 32592,
};

export const sampleWithFullData: IDepartment = {
  id: 20784,
  name: 'daunt idealize',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
