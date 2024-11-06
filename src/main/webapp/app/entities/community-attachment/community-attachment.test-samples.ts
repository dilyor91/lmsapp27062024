import { ICommunityAttachment, NewCommunityAttachment } from './community-attachment.model';

export const sampleWithRequiredData: ICommunityAttachment = {
  id: 3849,
};

export const sampleWithPartialData: ICommunityAttachment = {
  id: 3854,
};

export const sampleWithFullData: ICommunityAttachment = {
  id: 3168,
};

export const sampleWithNewData: NewCommunityAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
