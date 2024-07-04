import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 23418,
};

export const sampleWithPartialData: IGroup = {
  id: 6648,
};

export const sampleWithFullData: IGroup = {
  id: 20315,
  name: 'ah anti awesome',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
