import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 8038,
  courseName: 'snaggle',
  courseCode: 'improbable rope nearly',
  courseStartDate: dayjs('2024-06-26T19:00'),
  courseEndDate: dayjs('2024-06-27T04:12'),
  courseFormat: 'as',
  published: false,
  storageQuota: 10299,
  status: false,
};

export const sampleWithPartialData: ICourse = {
  id: 4782,
  courseName: 'upwardly busily colorfully',
  courseCode: 'disloyal',
  courseImagePath: 'cub',
  courseStartDate: dayjs('2024-06-26T14:23'),
  courseEndDate: dayjs('2024-06-27T02:11'),
  courseFormat: 'whether',
  published: true,
  selfEnrollmentCode: 'sympathetically',
  storageQuota: 27793,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 25596,
  courseName: 'upon',
  courseCode: 'dimly with',
  courseImagePath: 'er',
  courseStartDate: dayjs('2024-06-26T22:36'),
  courseEndDate: dayjs('2024-06-26T09:52'),
  courseFormat: 'if',
  published: true,
  selfEnrollment: true,
  selfEnrollmentCode: 'dearly phew',
  storageQuota: 23756,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'cheerfully wordy diligently',
  courseCode: 'roughly minus',
  courseStartDate: dayjs('2024-06-26T17:27'),
  courseEndDate: dayjs('2024-06-26T18:27'),
  courseFormat: 'nick wavy',
  published: true,
  storageQuota: 13476,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
