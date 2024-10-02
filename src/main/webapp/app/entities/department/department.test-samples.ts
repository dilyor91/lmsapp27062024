import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 11833,
};

export const sampleWithPartialData: IDepartment = {
  id: 27841,
  name: 'bug joyfully',
};

export const sampleWithFullData: IDepartment = {
  id: 23769,
  name: 'blink continually boohoo',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
