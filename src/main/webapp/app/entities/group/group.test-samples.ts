import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 1739,
};

export const sampleWithPartialData: IGroup = {
  id: 25732,
};

export const sampleWithFullData: IGroup = {
  id: 17080,
  name: 'silver optimistically board',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
