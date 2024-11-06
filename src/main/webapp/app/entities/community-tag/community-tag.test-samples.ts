import { ICommunityTag, NewCommunityTag } from './community-tag.model';

export const sampleWithRequiredData: ICommunityTag = {
  id: 5967,
};

export const sampleWithPartialData: ICommunityTag = {
  id: 17957,
};

export const sampleWithFullData: ICommunityTag = {
  id: 24431,
};

export const sampleWithNewData: NewCommunityTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
