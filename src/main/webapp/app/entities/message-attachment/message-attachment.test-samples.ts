import { IMessageAttachment, NewMessageAttachment } from './message-attachment.model';

export const sampleWithRequiredData: IMessageAttachment = {
  id: 8583,
};

export const sampleWithPartialData: IMessageAttachment = {
  id: 25868,
};

export const sampleWithFullData: IMessageAttachment = {
  id: 7436,
};

export const sampleWithNewData: NewMessageAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
