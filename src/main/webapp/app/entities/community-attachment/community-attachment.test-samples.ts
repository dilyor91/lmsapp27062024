import { ICommunityAttachment, NewCommunityAttachment } from './community-attachment.model';

export const sampleWithRequiredData: ICommunityAttachment = {
  id: 1643,
};

export const sampleWithPartialData: ICommunityAttachment = {
  id: 13148,
};

export const sampleWithFullData: ICommunityAttachment = {
  id: 19532,
};

export const sampleWithNewData: NewCommunityAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
