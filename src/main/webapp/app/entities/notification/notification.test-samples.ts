import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 911,
};

export const sampleWithPartialData: INotification = {
  id: 30861,
  readDate: dayjs('2024-07-31T06:00'),
  notificationType: 'ASSIGNMENT',
};

export const sampleWithFullData: INotification = {
  id: 29078,
  message: 'yahoo likely',
  readDate: dayjs('2024-07-31T01:27'),
  read: true,
  notificationType: 'ASSIGNMENT',
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
