import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 27506,
};

export const sampleWithPartialData: ITag = {
  id: 14867,
};

export const sampleWithFullData: ITag = {
  id: 17140,
  name: 'iterate everlasting',
};

export const sampleWithNewData: NewTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
