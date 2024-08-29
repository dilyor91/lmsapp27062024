import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 20372,
};

export const sampleWithPartialData: IGroup = {
  id: 4088,
};

export const sampleWithFullData: IGroup = {
  id: 23680,
  name: 'pace woolens',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
