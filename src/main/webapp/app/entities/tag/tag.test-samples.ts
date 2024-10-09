import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 12725,
};

export const sampleWithPartialData: ITag = {
  id: 28850,
};

export const sampleWithFullData: ITag = {
  id: 13955,
  name: 'pish meanwhile',
};

export const sampleWithNewData: NewTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
