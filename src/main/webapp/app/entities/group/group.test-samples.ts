import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 25898,
};

export const sampleWithPartialData: IGroup = {
  id: 5337,
  name: 'abstract',
};

export const sampleWithFullData: IGroup = {
  id: 25172,
  name: 'under',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
