import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 17266,
  name: 'cooperation whoever powerfully',
};

export const sampleWithPartialData: IBuilding = {
  id: 25700,
  name: 'ransack',
};

export const sampleWithFullData: IBuilding = {
  id: 15880,
  name: 'painfully as shrilly',
  description: 'worm hmph although',
  address: 'plume promptly mockingly',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'lest ouch broadly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
