import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 5610,
  courseName: 'outgoing',
  courseCode: 'leading',
  courseStartDate: dayjs('2024-06-26T21:13'),
  courseEndDate: dayjs('2024-06-27T04:22'),
  courseFormat: 'inborn accompany',
  published: true,
  storageQuota: 10977,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 9519,
  courseName: 'above',
  courseCode: 'help above than',
  courseStartDate: dayjs('2024-06-27T01:00'),
  courseEndDate: dayjs('2024-06-26T15:51'),
  courseFormat: 'bah silk meh',
  published: false,
  selfEnrollment: true,
  storageQuota: 24206,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 4758,
  courseName: 'whether',
  courseCode: 'lest',
  courseImagePath: 'which',
  courseStartDate: dayjs('2024-06-26T07:23'),
  courseEndDate: dayjs('2024-06-27T02:51'),
  courseFormat: 'amid defrag',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'and geez but',
  storageQuota: 30918,
  status: true,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'rebuff openly crystallize',
  courseCode: 'refute meanwhile till',
  courseStartDate: dayjs('2024-06-26T19:12'),
  courseEndDate: dayjs('2024-06-26T10:00'),
  courseFormat: 'so misappropriate duh',
  published: true,
  storageQuota: 26794,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
