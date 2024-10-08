import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 29528,
  courseName: 'of make',
  courseCode: 'hence',
  courseStartDate: dayjs('2024-06-27T06:20'),
  courseEndDate: dayjs('2024-06-26T06:28'),
  courseFormat: 'incidentally afore needily',
  published: false,
  storageQuota: 25533,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 18902,
  courseName: 'ouch',
  courseCode: 'well',
  courseImagePath: 'through',
  courseStartDate: dayjs('2024-06-26T16:08'),
  courseEndDate: dayjs('2024-06-26T13:20'),
  courseFormat: 'acidly nor finally',
  published: true,
  selfEnrollment: true,
  storageQuota: 26864,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 28990,
  courseName: 'until oof',
  courseCode: 'shoot mealy pastel',
  courseImagePath: 'roger on',
  courseStartDate: dayjs('2024-06-27T03:02'),
  courseEndDate: dayjs('2024-06-26T16:24'),
  courseFormat: 'afore knotty misappropriate',
  published: false,
  selfEnrollment: false,
  selfEnrollmentCode: 'inure comfortable guard',
  storageQuota: 9092,
  status: true,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'happy-go-lucky gloss',
  courseCode: 'bossy sophisticated tedious',
  courseStartDate: dayjs('2024-06-26T08:33'),
  courseEndDate: dayjs('2024-06-27T01:31'),
  courseFormat: 'barring',
  published: true,
  storageQuota: 24914,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
