import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 12769,
};

export const sampleWithPartialData: IDepartment = {
  id: 10786,
  name: 'distorted next regal',
};

export const sampleWithFullData: IDepartment = {
  id: 17294,
  name: 'portray lest',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
