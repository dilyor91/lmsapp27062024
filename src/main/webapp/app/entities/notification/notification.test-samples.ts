import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 11122,
};

export const sampleWithPartialData: INotification = {
  id: 12938,
  message: 'unethically out',
};

export const sampleWithFullData: INotification = {
  id: 21893,
  message: 'afore',
  readDate: dayjs('2024-07-30T18:15'),
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
