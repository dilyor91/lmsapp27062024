import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 16952,
};

export const sampleWithPartialData: INotification = {
  id: 19631,
  readDate: dayjs('2024-07-30T20:37'),
};

export const sampleWithFullData: INotification = {
  id: 10917,
  message: 'even',
  readDate: dayjs('2024-07-30T18:44'),
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
