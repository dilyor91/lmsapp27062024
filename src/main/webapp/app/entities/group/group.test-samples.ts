import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 6741,
};

export const sampleWithPartialData: IGroup = {
  id: 22827,
};

export const sampleWithFullData: IGroup = {
  id: 20097,
  name: 'disassociate',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
