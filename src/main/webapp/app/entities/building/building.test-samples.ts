import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 28420,
  name: 'behind ill across',
};

export const sampleWithPartialData: IBuilding = {
  id: 24585,
  name: 'acidly',
  description: 'solder',
  address: 'expatiate not gee',
  status: true,
};

export const sampleWithFullData: IBuilding = {
  id: 6911,
  name: 'likewise terribly leading',
  description: 'below stingy',
  address: 'broadly',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'within next',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
