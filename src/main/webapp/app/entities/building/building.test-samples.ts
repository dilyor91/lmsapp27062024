import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 8865,
  name: 'intermesh while only',
};

export const sampleWithPartialData: IBuilding = {
  id: 29217,
  name: 'after',
  description: 'oh',
  address: 'lid rule',
  status: true,
};

export const sampleWithFullData: IBuilding = {
  id: 17066,
  name: 'yuck mystify',
  description: 'while function',
  address: 'bah',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'unruly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
