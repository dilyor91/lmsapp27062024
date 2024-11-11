import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 30685,
};

export const sampleWithPartialData: IGroup = {
  id: 22690,
  name: 'silently black-and-white',
};

export const sampleWithFullData: IGroup = {
  id: 696,
  name: 'bashfully',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
