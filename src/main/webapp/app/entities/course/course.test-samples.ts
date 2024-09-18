import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 14593,
  courseName: 'finally a',
  courseCode: 'rove woot polarise',
  courseStartDate: dayjs('2024-06-27T04:34'),
  courseEndDate: dayjs('2024-06-26T20:44'),
  courseFormat: 'jovially before overweight',
  published: true,
  storageQuota: 14490,
  status: false,
};

export const sampleWithPartialData: ICourse = {
  id: 25446,
  courseName: 'rope',
  courseCode: 'suspiciously gosh webmail',
  courseStartDate: dayjs('2024-06-27T06:14'),
  courseEndDate: dayjs('2024-06-26T12:42'),
  courseFormat: 'whether of viability',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'however straighten',
  storageQuota: 6667,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 26507,
  courseName: 'wise',
  courseCode: 'amid innocently faithfully',
  courseImagePath: 'dabble under',
  courseStartDate: dayjs('2024-06-27T02:09'),
  courseEndDate: dayjs('2024-06-26T15:44'),
  courseFormat: 'while',
  published: false,
  selfEnrollment: false,
  selfEnrollmentCode: 'ugh actualise during',
  storageQuota: 8344,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'barring',
  courseCode: 'user why',
  courseStartDate: dayjs('2024-06-27T03:46'),
  courseEndDate: dayjs('2024-06-26T14:30'),
  courseFormat: 'up',
  published: false,
  storageQuota: 8406,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
