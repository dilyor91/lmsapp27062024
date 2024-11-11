import dayjs from 'dayjs/esm';

import { ICommunityMessage, NewCommunityMessage } from './community-message.model';

export const sampleWithRequiredData: ICommunityMessage = {
  id: 6095,
};

export const sampleWithPartialData: ICommunityMessage = {
  id: 25096,
  message: 'clear representation',
  senderDate: dayjs('2024-10-09T06:19'),
};

export const sampleWithFullData: ICommunityMessage = {
  id: 23152,
  message: 'beret worth around',
  senderDate: dayjs('2024-10-08T13:22'),
};

export const sampleWithNewData: NewCommunityMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
