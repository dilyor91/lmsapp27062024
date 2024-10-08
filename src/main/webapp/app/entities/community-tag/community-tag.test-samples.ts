import { ICommunityTag, NewCommunityTag } from './community-tag.model';

export const sampleWithRequiredData: ICommunityTag = {
  id: 27157,
};

export const sampleWithPartialData: ICommunityTag = {
  id: 16716,
};

export const sampleWithFullData: ICommunityTag = {
  id: 27088,
};

export const sampleWithNewData: NewCommunityTag = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
