import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 20374,
  courseName: 'shovel',
  courseCode: 'advertisement',
  courseStartDate: dayjs('2024-06-26T20:28'),
  courseEndDate: dayjs('2024-06-26T20:45'),
  courseFormat: 'overplay naughty',
  published: false,
  storageQuota: 1917,
  status: false,
};

export const sampleWithPartialData: ICourse = {
  id: 16760,
  courseName: 'up unwilling converse',
  courseCode: 'shady once',
  courseStartDate: dayjs('2024-06-27T04:19'),
  courseEndDate: dayjs('2024-06-26T15:47'),
  courseFormat: 'founder tremendously',
  published: true,
  storageQuota: 1739,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 432,
  courseName: 'tame certainly',
  courseCode: 'however',
  courseImagePath: 'nearly beneath lox',
  courseStartDate: dayjs('2024-06-27T06:16'),
  courseEndDate: dayjs('2024-06-27T02:33'),
  courseFormat: 'psst not scented',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'following unlike uh-huh',
  storageQuota: 32109,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'wilt briefly',
  courseCode: 'phew miserable qua',
  courseStartDate: dayjs('2024-06-27T03:13'),
  courseEndDate: dayjs('2024-06-26T19:47'),
  courseFormat: 'like inside',
  published: false,
  storageQuota: 23585,
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
