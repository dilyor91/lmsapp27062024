import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 4219,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 7226,
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 22049,
  read: true,
  readAt: dayjs('2024-09-17T15:34'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
