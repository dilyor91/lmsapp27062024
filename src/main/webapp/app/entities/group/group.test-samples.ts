import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 31109,
};

export const sampleWithPartialData: IGroup = {
  id: 13056,
};

export const sampleWithFullData: IGroup = {
  id: 27961,
  name: 'for',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
