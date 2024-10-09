import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 25650,
};

export const sampleWithPartialData: IGroup = {
  id: 25549,
  name: 'scientific configuration',
};

export const sampleWithFullData: IGroup = {
  id: 31685,
  name: 'rear abaft',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
