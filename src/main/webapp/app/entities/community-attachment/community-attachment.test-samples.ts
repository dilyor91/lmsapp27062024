import { ICommunityAttachment, NewCommunityAttachment } from './community-attachment.model';

export const sampleWithRequiredData: ICommunityAttachment = {
  id: 29534,
};

export const sampleWithPartialData: ICommunityAttachment = {
  id: 5996,
};

export const sampleWithFullData: ICommunityAttachment = {
  id: 10422,
};

export const sampleWithNewData: NewCommunityAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
