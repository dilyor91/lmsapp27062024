import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 10857,
};

export const sampleWithPartialData: IDepartment = {
  id: 30407,
};

export const sampleWithFullData: IDepartment = {
  id: 4561,
  name: 'and as snowplow',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
