import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 21165,
  courseName: 'sonnet below mystify',
  courseCode: 'duh',
  courseStartDate: dayjs('2024-06-27T01:31'),
  courseEndDate: dayjs('2024-06-26T06:35'),
  courseFormat: 'gosh unethically inventory',
  published: true,
  storageQuota: 24563,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 17802,
  courseName: 'informal',
  courseCode: 'whirlwind regarding',
  courseImagePath: 'through',
  courseStartDate: dayjs('2024-06-26T08:29'),
  courseEndDate: dayjs('2024-06-26T09:48'),
  courseFormat: 'annually arraign stratify',
  published: false,
  selfEnrollment: true,
  storageQuota: 14788,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 5221,
  courseName: 'offensively oh',
  courseCode: 'part',
  courseImagePath: 'ultimate custom fog',
  courseStartDate: dayjs('2024-06-27T00:18'),
  courseEndDate: dayjs('2024-06-26T21:57'),
  courseFormat: 'ouch',
  published: false,
  selfEnrollment: true,
  selfEnrollmentCode: 'worth past vein',
  storageQuota: 22525,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'along',
  courseCode: 'pish sting about',
  courseStartDate: dayjs('2024-06-26T09:25'),
  courseEndDate: dayjs('2024-06-26T14:08'),
  courseFormat: 'too',
  published: true,
  storageQuota: 13325,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
