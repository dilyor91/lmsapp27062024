import { IAttachment, NewAttachment } from './attachment.model';

export const sampleWithRequiredData: IAttachment = {
  id: 14184,
};

export const sampleWithPartialData: IAttachment = {
  id: 32753,
};

export const sampleWithFullData: IAttachment = {
  id: 19625,
};

export const sampleWithNewData: NewAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
