import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 24520,
};

export const sampleWithPartialData: INotification = {
  id: 5437,
  message: 'thin nor',
  notificationType: 'SUBMISSION_ASSIGNMENT',
};

export const sampleWithFullData: INotification = {
  id: 24570,
  message: 'sneak barring',
  readDate: dayjs('2024-07-30T19:40'),
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
