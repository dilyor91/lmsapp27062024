import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 19260,
  name: 'across',
};

export const sampleWithPartialData: IBuilding = {
  id: 9317,
  name: 'attraction ugh',
  description: 'indeed',
  address: 'graffiti truly drat',
  status: false,
};

export const sampleWithFullData: IBuilding = {
  id: 6619,
  name: 'straight',
  description: 'orientate',
  address: 'final',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'peaceful gift faithfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
