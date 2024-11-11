import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 22899,
};

export const sampleWithPartialData: ITag = {
  id: 18880,
};

export const sampleWithFullData: ITag = {
  id: 21609,
  name: 'jaggedly team ceramics',
};

export const sampleWithNewData: NewTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
