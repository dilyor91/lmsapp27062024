import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 18485,
};

export const sampleWithPartialData: IGroup = {
  id: 1421,
};

export const sampleWithFullData: IGroup = {
  id: 11623,
  name: 'affectionate secretariat',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
