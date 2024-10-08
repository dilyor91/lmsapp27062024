import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 26397,
};

export const sampleWithPartialData: IGroup = {
  id: 206,
  name: 'unselfish with black-and-white',
};

export const sampleWithFullData: IGroup = {
  id: 14729,
  name: 'navigate lest lest',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
