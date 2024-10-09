import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 31612,
  name: 'dowse',
};

export const sampleWithPartialData: IBuilding = {
  id: 31391,
  name: 'even',
  address: 'pish colligate nocturnal',
};

export const sampleWithFullData: IBuilding = {
  id: 7551,
  name: 'astride provided',
  description: 'nifty',
  address: 'into typewriter devastation',
  status: false,
};

export const sampleWithNewData: NewBuilding = {
  name: 'even',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
