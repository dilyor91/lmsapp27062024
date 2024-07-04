import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 15974,
};

export const sampleWithPartialData: IGroup = {
  id: 4906,
};

export const sampleWithFullData: IGroup = {
  id: 20068,
  name: 'inasmuch until',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
