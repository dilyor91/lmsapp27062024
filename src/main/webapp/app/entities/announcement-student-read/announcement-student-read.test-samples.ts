import dayjs from 'dayjs/esm';

import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from './announcement-student-read.model';

export const sampleWithRequiredData: IAnnouncementStudentRead = {
  id: 26390,
};

export const sampleWithPartialData: IAnnouncementStudentRead = {
  id: 22274,
};

export const sampleWithFullData: IAnnouncementStudentRead = {
  id: 15627,
  read: false,
  readAt: dayjs('2024-09-18T06:12'),
};

export const sampleWithNewData: NewAnnouncementStudentRead = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
