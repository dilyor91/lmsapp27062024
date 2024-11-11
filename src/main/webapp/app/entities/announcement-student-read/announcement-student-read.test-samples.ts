import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 27060,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 4730,
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 3460,
  read: true,
  readAt: dayjs('2024-09-17T10:02'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
