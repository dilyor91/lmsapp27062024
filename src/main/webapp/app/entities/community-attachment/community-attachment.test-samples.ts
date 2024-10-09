import { ICommunityAttachment, NewCommunityAttachment } from './community-attachment.model';

export const sampleWithRequiredData: ICommunityAttachment = {
  id: 11757,
};

export const sampleWithPartialData: ICommunityAttachment = {
  id: 18850,
};

export const sampleWithFullData: ICommunityAttachment = {
  id: 6993,
};

export const sampleWithNewData: NewCommunityAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
