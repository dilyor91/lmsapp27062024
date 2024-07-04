import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 16668,
  courseName: 'bare which',
  courseCode: 'next deficient',
  courseStartDate: dayjs('2024-06-26T11:33'),
  courseEndDate: dayjs('2024-06-27T00:29'),
  courseFormat: 'while er pro',
  published: false,
  storageQuota: 27655,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 20901,
  courseName: 'bakery promenade',
  courseCode: 'recklessly',
  courseImagePath: 'anenst ripe',
  courseStartDate: dayjs('2024-06-27T02:47'),
  courseEndDate: dayjs('2024-06-26T15:57'),
  courseFormat: 'wee phooey',
  published: false,
  selfEnrollmentCode: 'halibut along so',
  storageQuota: 20351,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 11054,
  courseName: 'furthermore although',
  courseCode: 'abaft phew',
  courseImagePath: 'woot',
  courseStartDate: dayjs('2024-06-27T05:51'),
  courseEndDate: dayjs('2024-06-26T10:37'),
  courseFormat: 'whether rewrite',
  published: false,
  selfEnrollment: false,
  selfEnrollmentCode: 'rowdy',
  storageQuota: 14690,
  status: true,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'violently frozen how',
  courseCode: 'maunder nor physically',
  courseStartDate: dayjs('2024-06-26T08:07'),
  courseEndDate: dayjs('2024-06-26T07:04'),
  courseFormat: 'vacantly gadzooks hmph',
  published: false,
  storageQuota: 13296,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
