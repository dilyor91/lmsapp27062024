import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 27476,
};

export const sampleWithPartialData: ITag = {
  id: 15978,
  name: 'before like',
};

export const sampleWithFullData: ITag = {
  id: 3318,
  name: 'brace which',
};

export const sampleWithNewData: NewTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
