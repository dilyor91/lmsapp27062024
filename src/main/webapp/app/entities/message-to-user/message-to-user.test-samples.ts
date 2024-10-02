import dayjs from 'dayjs/esm';

import { IMessageToUser, NewMessageToUser } from './message-to-user.model';

export const sampleWithRequiredData: IMessageToUser = {
  id: 25564,
};

export const sampleWithPartialData: IMessageToUser = {
  id: 16088,
  readAt: dayjs('2024-10-01T09:52'),
  deleted: false,
};

export const sampleWithFullData: IMessageToUser = {
  id: 5989,
  read: false,
  readAt: dayjs('2024-10-01T11:34'),
  deleted: true,
};

export const sampleWithNewData: NewMessageToUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
