import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 18516,
};

export const sampleWithPartialData: INotification = {
  id: 26154,
  message: 'incidentally thorn',
};

export const sampleWithFullData: INotification = {
  id: 9906,
  message: 'urgently',
  readDate: dayjs('2024-07-30T14:49'),
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
