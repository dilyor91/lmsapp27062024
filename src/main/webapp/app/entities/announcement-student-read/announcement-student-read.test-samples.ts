import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 1892,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 31163,
  read: false,
  readAt: dayjs('2024-09-17T19:06'),
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 17284,
  read: false,
  readAt: dayjs('2024-09-17T17:36'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
