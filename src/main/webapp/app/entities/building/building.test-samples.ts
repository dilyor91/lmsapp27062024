import { IBuilding, NewBuilding } from './building.model';

export const sampleWithRequiredData: IBuilding = {
  id: 21892,
  name: 'excepting',
};

export const sampleWithPartialData: IBuilding = {
  id: 13779,
  name: 'jaggedly unlined tepid',
  description: 'gah whose dishearten',
  address: 'to',
  status: true,
};

export const sampleWithFullData: IBuilding = {
  id: 19081,
  name: 'neatly furthermore',
  description: 'hoof gadzooks yuck',
  address: 'ill athwart',
  status: true,
};

export const sampleWithNewData: NewBuilding = {
  name: 'via',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
