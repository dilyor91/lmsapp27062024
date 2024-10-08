import dayjs from 'dayjs/esm';

import { IMessageToUser, NewMessageToUser } from './message-to-user.model';

export const sampleWithRequiredData: IMessageToUser = {
  id: 18107,
};

export const sampleWithPartialData: IMessageToUser = {
  id: 21080,
  read: false,
};

export const sampleWithFullData: IMessageToUser = {
  id: 30513,
  read: false,
  readAt: dayjs('2024-10-01T18:05'),
  deleted: false,
};

export const sampleWithNewData: NewMessageToUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
