import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 16649,
};

export const sampleWithPartialData: INotification = {
  id: 31567,
  read: false,
  notificationType: 'SUBMISSION_ASSIGNMENT',
};

export const sampleWithFullData: INotification = {
  id: 19913,
  message: 'incidentally times',
  readDate: dayjs('2024-07-31T05:25'),
  read: true,
  notificationType: 'SUBMISSION_ASSIGNMENT',
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
