import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 13811,
};

export const sampleWithPartialData: IGroup = {
  id: 13689,
};

export const sampleWithFullData: IGroup = {
  id: 6213,
  name: 'where',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
