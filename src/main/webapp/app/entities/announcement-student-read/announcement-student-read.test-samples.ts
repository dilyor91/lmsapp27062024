import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 20553,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 290,
  readAt: dayjs('2024-09-18T01:27'),
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 31028,
  read: true,
  readAt: dayjs('2024-09-17T08:56'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
