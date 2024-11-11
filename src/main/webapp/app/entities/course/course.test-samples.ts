import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 16192,
  courseName: 'unless',
  courseCode: 'charm',
  courseStartDate: dayjs('2024-06-26T07:10'),
  courseEndDate: dayjs('2024-06-27T00:16'),
  courseFormat: 'helplessly actually',
  published: false,
  storageQuota: 16610,
  status: false,
};

export const sampleWithPartialData: ICourse = {
  id: 28549,
  courseName: 'ouch',
  courseCode: 'tenderly',
  courseImagePath: 'yet slide',
  courseStartDate: dayjs('2024-06-27T01:43'),
  courseEndDate: dayjs('2024-06-26T22:51'),
  courseFormat: 'before',
  published: false,
  selfEnrollmentCode: 'whenever whoever',
  storageQuota: 8149,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 6041,
  courseName: 'gah aw',
  courseCode: 'honestly reference once',
  courseImagePath: 'down',
  courseStartDate: dayjs('2024-06-26T11:09'),
  courseEndDate: dayjs('2024-06-26T19:47'),
  courseFormat: 'convince institute',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'since',
  storageQuota: 23093,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'chow',
  courseCode: 'sheepishly harmful',
  courseStartDate: dayjs('2024-06-26T22:52'),
  courseEndDate: dayjs('2024-06-26T09:00'),
  courseFormat: 'key',
  published: true,
  storageQuota: 12695,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
