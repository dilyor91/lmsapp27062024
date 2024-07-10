import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 25691,
  courseName: 'in',
  courseCode: 'below',
  courseStartDate: dayjs('2024-06-26T16:55'),
  courseEndDate: dayjs('2024-06-27T04:44'),
  courseFormat: 'uh-huh within',
  published: false,
  storageQuota: 27523,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 30394,
  courseName: 'for on',
  courseCode: 'playful plus',
  courseImagePath: 'typeface',
  courseStartDate: dayjs('2024-06-26T08:44'),
  courseEndDate: dayjs('2024-06-26T13:23'),
  courseFormat: 'where kick',
  published: true,
  storageQuota: 8265,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 523,
  courseName: 'bubbly',
  courseCode: 'accent',
  courseImagePath: 'duh refinance',
  courseStartDate: dayjs('2024-06-26T14:45'),
  courseEndDate: dayjs('2024-06-27T03:09'),
  courseFormat: 'violently slope while',
  published: false,
  selfEnrollment: false,
  selfEnrollmentCode: 'canon till',
  storageQuota: 29240,
  status: true,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'gosh imperfect inasmuch',
  courseCode: 'redistribute lest joyously',
  courseStartDate: dayjs('2024-06-27T00:23'),
  courseEndDate: dayjs('2024-06-26T14:10'),
  courseFormat: 'forenenst',
  published: true,
  storageQuota: 11273,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
