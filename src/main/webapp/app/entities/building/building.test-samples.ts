import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 9866,
  name: 'near onto polarisation',
};

export const sampleWithPartialData: IBuilding = {
  id: 17209,
  name: 'abnegate limping terrorise',
  address: 'mechanic apropos',
  status: true,
};

export const sampleWithFullData: IBuilding = {
  id: 7223,
  name: 'while partially community',
  description: 'which ack poorly',
  address: 'opposite fussy',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'owlishly before repeat',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
