import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 24702,
};

export const sampleWithPartialData: INotification = {
  id: 11636,
  readDate: dayjs('2024-07-31T08:38'),
};

export const sampleWithFullData: INotification = {
  id: 28766,
  message: 'down undergo now',
  readDate: dayjs('2024-07-31T06:15'),
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
