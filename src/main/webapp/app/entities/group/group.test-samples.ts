import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 26504,
};

export const sampleWithPartialData: IGroup = {
  id: 29203,
};

export const sampleWithFullData: IGroup = {
  id: 14999,
  name: 'crafty seemingly bah',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
