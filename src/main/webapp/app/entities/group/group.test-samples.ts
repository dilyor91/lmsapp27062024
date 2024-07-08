import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 20318,
};

export const sampleWithPartialData: IGroup = {
  id: 11742,
  name: 'punctually aha',
};

export const sampleWithFullData: IGroup = {
  id: 8260,
  name: 'needily',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
