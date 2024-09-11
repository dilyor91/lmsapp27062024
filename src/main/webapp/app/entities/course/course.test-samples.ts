import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 29991,
  courseName: 'ugh',
  courseCode: 'gosh finally',
  courseStartDate: dayjs('2024-06-27T05:44'),
  courseEndDate: dayjs('2024-06-27T05:19'),
  courseFormat: 'ripple',
  published: false,
  storageQuota: 20638,
  status: false,
};

export const sampleWithPartialData: ICourse = {
  id: 7929,
  courseName: 'dealer',
  courseCode: 'oof cloud',
  courseImagePath: 'than',
  courseStartDate: dayjs('2024-06-26T12:30'),
  courseEndDate: dayjs('2024-06-26T08:03'),
  courseFormat: 'aha yum',
  published: true,
  storageQuota: 28008,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 11096,
  courseName: 'indeed',
  courseCode: 'hence only finally',
  courseImagePath: 'hopeful polarisation bowl',
  courseStartDate: dayjs('2024-06-26T08:16'),
  courseEndDate: dayjs('2024-06-27T02:01'),
  courseFormat: 'inside',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'lunch within',
  storageQuota: 7435,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'welch',
  courseCode: 'boatload hence',
  courseStartDate: dayjs('2024-06-26T13:00'),
  courseEndDate: dayjs('2024-06-27T00:28'),
  courseFormat: 'what whoever by',
  published: true,
  storageQuota: 18,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
