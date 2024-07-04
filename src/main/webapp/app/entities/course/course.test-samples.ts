import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 25317,
  courseName: 'glum gee',
  courseCode: 'object',
  courseStartDate: dayjs('2024-06-26T07:21'),
  courseEndDate: dayjs('2024-06-26T15:17'),
  courseFormat: 'familiar',
  published: false,
  storageQuota: 2108,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 16373,
  courseName: 'mostly cough',
  courseCode: 'whenever',
  courseStartDate: dayjs('2024-06-27T04:46'),
  courseEndDate: dayjs('2024-06-26T22:36'),
  courseFormat: 'amongst powerfully as',
  published: false,
  storageQuota: 17195,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 5236,
  courseName: 'recklessly',
  courseCode: 'zowie',
  courseImagePath: 'lavish provided',
  courseStartDate: dayjs('2024-06-26T21:00'),
  courseEndDate: dayjs('2024-06-26T19:59'),
  courseFormat: 'full',
  published: true,
  selfEnrollment: true,
  selfEnrollmentCode: 'cleverly quirky shakily',
  storageQuota: 3717,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'yowza lively',
  courseCode: 'reverberate ick',
  courseStartDate: dayjs('2024-06-26T06:54'),
  courseEndDate: dayjs('2024-06-26T07:22'),
  courseFormat: 'resist',
  published: true,
  storageQuota: 24359,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
