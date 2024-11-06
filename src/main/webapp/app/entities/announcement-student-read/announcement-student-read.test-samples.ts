import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 32756,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 13920,
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 6119,
  read: false,
  readAt: dayjs('2024-09-18T00:23'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
