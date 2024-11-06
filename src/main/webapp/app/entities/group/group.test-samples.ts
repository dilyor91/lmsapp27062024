import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 26740,
};

export const sampleWithPartialData: IGroup = {
  id: 19428,
  name: 'jazz shady',
};

export const sampleWithFullData: IGroup = {
  id: 31496,
  name: 'terrorise phooey er',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
