import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 23888,
  courseName: 'whose',
  courseCode: 'upon reassuringly load',
  courseStartDate: dayjs('2024-06-26T15:24'),
  courseEndDate: dayjs('2024-06-26T07:01'),
  courseFormat: 'besides lovingly',
  published: false,
  storageQuota: 16519,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 11886,
  courseName: 'tempting',
  courseCode: 'shrine pish deter',
  courseStartDate: dayjs('2024-06-27T04:26'),
  courseEndDate: dayjs('2024-06-26T06:21'),
  courseFormat: 'novel worth',
  published: true,
  storageQuota: 22935,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 31031,
  courseName: 'helpfully while among',
  courseCode: 'dagger',
  courseImagePath: 'blind',
  courseStartDate: dayjs('2024-06-27T04:51'),
  courseEndDate: dayjs('2024-06-26T13:27'),
  courseFormat: 'finally improbable',
  published: false,
  selfEnrollment: false,
  selfEnrollmentCode: 'pin',
  storageQuota: 24843,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'treasured',
  courseCode: 'now aboard',
  courseStartDate: dayjs('2024-06-26T14:55'),
  courseEndDate: dayjs('2024-06-26T09:39'),
  courseFormat: 'tenderly',
  published: true,
  storageQuota: 24113,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
