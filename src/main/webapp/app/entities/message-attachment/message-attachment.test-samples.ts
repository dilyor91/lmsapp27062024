import { IMessageAttachment, NewMessageAttachment } from './message-attachment.model';

export const sampleWithRequiredData: IMessageAttachment = {
  id: 14113,
};

export const sampleWithPartialData: IMessageAttachment = {
  id: 19190,
};

export const sampleWithFullData: IMessageAttachment = {
  id: 18381,
};

export const sampleWithNewData: NewMessageAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
