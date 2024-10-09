import { IMessageAttachment, NewMessageAttachment } from './message-attachment.model';

export const sampleWithRequiredData: IMessageAttachment = {
  id: 15688,
};

export const sampleWithPartialData: IMessageAttachment = {
  id: 19136,
};

export const sampleWithFullData: IMessageAttachment = {
  id: 12106,
};

export const sampleWithNewData: NewMessageAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
