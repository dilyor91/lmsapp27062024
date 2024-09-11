import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 2906,
  name: 'privacy extremely hence',
};

export const sampleWithPartialData: IBuilding = {
  id: 100,
  name: 'identical option',
  description: 'upwardly drat sunset',
};

export const sampleWithFullData: IBuilding = {
  id: 22382,
  name: 'avaricious sans',
  description: 'rigid',
  address: 'though',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'throughout physically',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
