import { IAttachment, NewAttachment } from './attachment.model';

export const sampleWithRequiredData: IAttachment = {
  id: 7264,
};

export const sampleWithPartialData: IAttachment = {
  id: 28264,
};

export const sampleWithFullData: IAttachment = {
  id: 29991,
};

export const sampleWithNewData: NewAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
