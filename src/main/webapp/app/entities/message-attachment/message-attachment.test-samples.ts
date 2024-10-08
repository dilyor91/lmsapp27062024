import { IMessageAttachment, NewMessageAttachment } from './message-attachment.model';

export const sampleWithRequiredData: IMessageAttachment = {
  id: 5224,
};

export const sampleWithPartialData: IMessageAttachment = {
  id: 24402,
};

export const sampleWithFullData: IMessageAttachment = {
  id: 28875,
};

export const sampleWithNewData: NewMessageAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
