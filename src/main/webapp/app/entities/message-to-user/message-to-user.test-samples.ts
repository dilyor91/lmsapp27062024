import dayjs from 'dayjs/esm';

import { IMessageToUser, NewMessageToUser } from './message-to-user.model';

export const sampleWithRequiredData: IMessageToUser = {
  id: 1381,
};

export const sampleWithPartialData: IMessageToUser = {
  id: 1943,
  read: false,
  deleted: false,
};

export const sampleWithFullData: IMessageToUser = {
  id: 10296,
  read: false,
  readAt: dayjs('2024-10-01T19:18'),
  deleted: true,
};

export const sampleWithNewData: NewMessageToUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
