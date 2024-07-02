import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 9632,
};

export const sampleWithPartialData: IGroup = {
  id: 20141,
  name: 'from schuss liquid',
};

export const sampleWithFullData: IGroup = {
  id: 5528,
  name: 'chair carelessly',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
