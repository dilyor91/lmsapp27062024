import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 32695,
  courseName: 'whoa',
  courseCode: 'funk',
  courseStartDate: dayjs('2024-06-26T12:11'),
  courseEndDate: dayjs('2024-06-27T06:15'),
  courseFormat: 'parlay',
  published: false,
  storageQuota: 16590,
  status: false,
};

export const sampleWithPartialData: ICourse = {
  id: 17554,
  courseName: 'closely whether',
  courseCode: 'investigate excepting tepid',
  courseStartDate: dayjs('2024-06-26T11:31'),
  courseEndDate: dayjs('2024-06-26T20:54'),
  courseFormat: 'which downshift while',
  published: false,
  selfEnrollment: true,
  storageQuota: 5448,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 4672,
  courseName: 'because highly creamy',
  courseCode: 'gadzooks while',
  courseImagePath: 'drat multicolored um',
  courseStartDate: dayjs('2024-06-27T05:18'),
  courseEndDate: dayjs('2024-06-26T21:40'),
  courseFormat: 'near snack under',
  published: false,
  selfEnrollment: true,
  selfEnrollmentCode: 'control',
  storageQuota: 23559,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'phew coinsurance duh',
  courseCode: 'now',
  courseStartDate: dayjs('2024-06-26T16:15'),
  courseEndDate: dayjs('2024-06-27T04:28'),
  courseFormat: 'versus jealous pish',
  published: false,
  storageQuota: 27689,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
