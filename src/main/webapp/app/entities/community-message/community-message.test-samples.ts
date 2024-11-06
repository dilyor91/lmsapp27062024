import dayjs from 'dayjs/esm';

import { ICommunityMessage, NewCommunityMessage } from './community-message.model';

export const sampleWithRequiredData: ICommunityMessage = {
  id: 18080,
};

export const sampleWithPartialData: ICommunityMessage = {
  id: 14606,
  message: 'lazily minister finally',
};

export const sampleWithFullData: ICommunityMessage = {
  id: 2256,
  message: 'husband',
  senderDate: dayjs('2024-10-08T22:28'),
};

export const sampleWithNewData: NewCommunityMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
