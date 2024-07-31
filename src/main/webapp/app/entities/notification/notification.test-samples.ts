import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 28336,
};

export const sampleWithPartialData: INotification = {
  id: 13008,
  read: true,
};

export const sampleWithFullData: INotification = {
  id: 16424,
  message: 'gorgeous amidst',
  readDate: dayjs('2024-07-30T09:28'),
  read: false,
  notificationType: 'ASSIGNMENT',
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
