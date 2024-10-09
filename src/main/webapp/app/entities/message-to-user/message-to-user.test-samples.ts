import dayjs from 'dayjs/esm';

import { IMessageToUser, NewMessageToUser } from './message-to-user.model';

export const sampleWithRequiredData: IMessageToUser = {
  id: 20863,
};

export const sampleWithPartialData: IMessageToUser = {
  id: 25085,
  read: true,
  readAt: dayjs('2024-10-01T23:56'),
  deleted: true,
};

export const sampleWithFullData: IMessageToUser = {
  id: 31099,
  read: false,
  readAt: dayjs('2024-10-01T07:14'),
  deleted: false,
};

export const sampleWithNewData: NewMessageToUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
