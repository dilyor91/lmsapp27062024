import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 1983,
  courseName: 'forbear ugh now',
  courseCode: 'prune eventually quietly',
  courseStartDate: dayjs('2024-06-26T08:41'),
  courseEndDate: dayjs('2024-06-26T19:33'),
  courseFormat: 'uh-huh misguided',
  published: false,
  storageQuota: 10397,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 29745,
  courseName: 'mmm onto',
  courseCode: 'direct row roughly',
  courseImagePath: 'consider till',
  courseStartDate: dayjs('2024-06-26T10:44'),
  courseEndDate: dayjs('2024-06-26T19:27'),
  courseFormat: 'tulip mammoth aw',
  published: true,
  selfEnrollmentCode: 'before',
  storageQuota: 8620,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 17852,
  courseName: 'through playfully until',
  courseCode: 'monthly including',
  courseImagePath: 'lope',
  courseStartDate: dayjs('2024-06-27T04:50'),
  courseEndDate: dayjs('2024-06-27T02:48'),
  courseFormat: 'when root',
  published: true,
  selfEnrollment: true,
  selfEnrollmentCode: 'beside gosh',
  storageQuota: 23595,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'hm knowingly',
  courseCode: 'upchange',
  courseStartDate: dayjs('2024-06-26T22:13'),
  courseEndDate: dayjs('2024-06-27T01:28'),
  courseFormat: 'thank onto who',
  published: true,
  storageQuota: 19379,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
