import dayjs from 'dayjs/esm';

import { IMessageToUser, NewMessageToUser } from './message-to-user.model';

export const sampleWithRequiredData: IMessageToUser = {
  id: 6994,
};

export const sampleWithPartialData: IMessageToUser = {
  id: 2302,
  deleted: true,
};

export const sampleWithFullData: IMessageToUser = {
  id: 28007,
  read: true,
  readAt: dayjs('2024-10-02T05:12'),
  deleted: false,
};

export const sampleWithNewData: NewMessageToUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
