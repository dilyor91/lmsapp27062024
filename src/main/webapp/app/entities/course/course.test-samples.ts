import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 24391,
  courseName: 'overconfidently',
  courseCode: 'tone down',
  courseStartDate: dayjs('2024-06-26T15:16'),
  courseEndDate: dayjs('2024-06-27T02:18'),
  courseFormat: 'tuba',
  published: true,
  storageQuota: 425,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 10988,
  courseName: 'beside but',
  courseCode: 'mysteriously brilliant agonize',
  courseStartDate: dayjs('2024-06-27T03:30'),
  courseEndDate: dayjs('2024-06-26T13:16'),
  courseFormat: 'closely yowza barring',
  published: false,
  storageQuota: 28411,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 8616,
  courseName: 'grate vinyl',
  courseCode: 'flip',
  courseImagePath: 'yuck',
  courseStartDate: dayjs('2024-06-26T15:33'),
  courseEndDate: dayjs('2024-06-26T13:21'),
  courseFormat: 'at gosh hm',
  published: false,
  selfEnrollment: false,
  selfEnrollmentCode: 'or',
  storageQuota: 27580,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'despite mmm',
  courseCode: 'annual',
  courseStartDate: dayjs('2024-06-27T01:33'),
  courseEndDate: dayjs('2024-06-26T06:26'),
  courseFormat: 'till fooey swiftly',
  published: false,
  storageQuota: 15320,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
