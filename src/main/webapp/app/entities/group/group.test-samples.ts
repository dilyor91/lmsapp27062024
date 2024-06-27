import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 13985,
};

export const sampleWithPartialData: IGroup = {
  id: 17277,
};

export const sampleWithFullData: IGroup = {
  id: 29472,
  name: 'roughly almost',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
