import { IMessageAttachment, NewMessageAttachment } from './message-attachment.model';

export const sampleWithRequiredData: IMessageAttachment = {
  id: 11946,
};

export const sampleWithPartialData: IMessageAttachment = {
  id: 6764,
};

export const sampleWithFullData: IMessageAttachment = {
  id: 31206,
};

export const sampleWithNewData: NewMessageAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
