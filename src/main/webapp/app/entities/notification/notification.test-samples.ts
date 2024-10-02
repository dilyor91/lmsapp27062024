import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 25259,
};

export const sampleWithPartialData: INotification = {
  id: 420,
  readDate: dayjs('2024-07-30T18:16'),
  read: false,
};

export const sampleWithFullData: INotification = {
  id: 9991,
  message: 'yahoo catalog and',
  readDate: dayjs('2024-07-31T03:39'),
  read: false,
  notificationType: 'QUIZ',
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
