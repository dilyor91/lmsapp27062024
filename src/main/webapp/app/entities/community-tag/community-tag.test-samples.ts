import { ICommunityTag, NewCommunityTag } from './community-tag.model';

export const sampleWithRequiredData: ICommunityTag = {
  id: 3108,
};

export const sampleWithPartialData: ICommunityTag = {
  id: 3318,
};

export const sampleWithFullData: ICommunityTag = {
  id: 31669,
};

export const sampleWithNewData: NewCommunityTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
