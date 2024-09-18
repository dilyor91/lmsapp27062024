import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 9481,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 14691,
  read: false,
  readAt: dayjs('2024-09-17T17:11'),
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 14866,
  read: true,
  readAt: dayjs('2024-09-17T12:11'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
