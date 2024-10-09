import dayjs from 'dayjs/esm';

import { ICommunityMessage, NewCommunityMessage } from './community-message.model';

export const sampleWithRequiredData: ICommunityMessage = {
  id: 9042,
};

export const sampleWithPartialData: ICommunityMessage = {
  id: 30345,
  message: 'better',
};

export const sampleWithFullData: ICommunityMessage = {
  id: 19964,
  message: 'technologist now drat',
  senderDate: dayjs('2024-10-08T19:07'),
};

export const sampleWithNewData: NewCommunityMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
