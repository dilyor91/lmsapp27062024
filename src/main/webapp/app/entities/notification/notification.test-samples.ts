import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 19696,
};

export const sampleWithPartialData: INotification = {
  id: 3029,
  read: false,
};

export const sampleWithFullData: INotification = {
  id: 10112,
  message: 'at',
  readDate: dayjs('2024-07-30T17:52'),
  read: false,
  notificationType: 'SUBMISSION_ASSIGNMENT',
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
