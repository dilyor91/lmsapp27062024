import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 5131,
};

export const sampleWithPartialData: IDepartment = {
  id: 24439,
};

export const sampleWithFullData: IDepartment = {
  id: 25423,
  name: 'chromakey curiously',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
