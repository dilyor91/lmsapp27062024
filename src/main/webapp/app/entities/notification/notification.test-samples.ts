import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 19684,
};

export const sampleWithPartialData: INotification = {
  id: 1881,
  message: 'thrifty',
  notificationType: 'SUBMISSION_ASSIGNMENT',
};

export const sampleWithFullData: INotification = {
  id: 21545,
  message: 'pasture counter so',
  readDate: dayjs('2024-07-30T15:47'),
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
