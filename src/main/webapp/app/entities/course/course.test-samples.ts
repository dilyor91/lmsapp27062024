import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 11617,
  courseName: 'tensely wherever if',
  courseCode: 'liberalize meanwhile supposing',
  courseStartDate: dayjs('2024-06-26T21:52'),
  courseEndDate: dayjs('2024-06-26T18:50'),
  courseFormat: 'aha',
  published: true,
  storageQuota: 24132,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 16797,
  courseName: 'kit enlist briefly',
  courseCode: 'tightly',
  courseImagePath: 'junior majority',
  courseStartDate: dayjs('2024-06-26T14:50'),
  courseEndDate: dayjs('2024-06-26T13:19'),
  courseFormat: 'because where',
  published: true,
  selfEnrollmentCode: 'fooey without',
  storageQuota: 16013,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 3753,
  courseName: 'considerate correctly',
  courseCode: 'effector meh monthly',
  courseImagePath: 'although menacing voluntarily',
  courseStartDate: dayjs('2024-06-26T17:27'),
  courseEndDate: dayjs('2024-06-26T09:23'),
  courseFormat: 'once atop',
  published: true,
  selfEnrollment: true,
  selfEnrollmentCode: 'firsthand',
  storageQuota: 15028,
  status: true,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'enlightened',
  courseCode: 'loosely warming wonderfully',
  courseStartDate: dayjs('2024-06-27T05:43'),
  courseEndDate: dayjs('2024-06-27T04:54'),
  courseFormat: 'windy up',
  published: false,
  storageQuota: 9786,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
