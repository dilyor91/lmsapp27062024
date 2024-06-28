import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 13953,
  courseName: 'which innocent',
  courseCode: 'after drat',
  courseStartDate: dayjs('2024-06-26T20:33'),
  courseEndDate: dayjs('2024-06-26T15:35'),
  courseFormat: 'safeguard clench',
  published: true,
  storageQuota: 6806,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 31493,
  courseName: 'shipper',
  courseCode: 'easily around whoa',
  courseImagePath: 'highway',
  courseStartDate: dayjs('2024-06-27T02:40'),
  courseEndDate: dayjs('2024-06-26T11:23'),
  courseFormat: 'soil',
  published: true,
  storageQuota: 4259,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 19986,
  courseName: 'instead',
  courseCode: 'amid by',
  courseImagePath: 'up versus superficial',
  courseStartDate: dayjs('2024-06-27T03:49'),
  courseEndDate: dayjs('2024-06-27T04:02'),
  courseFormat: 'physically mmm',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'although anenst tankful',
  storageQuota: 24908,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'zowie leader sans',
  courseCode: 'which',
  courseStartDate: dayjs('2024-06-26T23:37'),
  courseEndDate: dayjs('2024-06-26T13:49'),
  courseFormat: 'seriously fooey',
  published: false,
  storageQuota: 8509,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
