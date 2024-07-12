import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 574,
};

export const sampleWithPartialData: IGroup = {
  id: 13889,
};

export const sampleWithFullData: IGroup = {
  id: 25326,
  name: 'excite boo',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
