import { ICommunityTag, NewCommunityTag } from './community-tag.model';

export const sampleWithRequiredData: ICommunityTag = {
  id: 24444,
};

export const sampleWithPartialData: ICommunityTag = {
  id: 19447,
};

export const sampleWithFullData: ICommunityTag = {
  id: 17806,
};

export const sampleWithNewData: NewCommunityTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
