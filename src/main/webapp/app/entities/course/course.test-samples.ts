import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 27908,
  courseName: 'quizzically',
  courseCode: 'truthful impolite',
  courseStartDate: dayjs('2024-06-27T02:32'),
  courseEndDate: dayjs('2024-06-26T16:32'),
  courseFormat: 'reward bronchitis',
  published: true,
  storageQuota: 19723,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 7264,
  courseName: 'decryption however hmph',
  courseCode: 'psst athwart whose',
  courseStartDate: dayjs('2024-06-26T22:56'),
  courseEndDate: dayjs('2024-06-26T15:34'),
  courseFormat: 'veil',
  published: true,
  selfEnrollment: false,
  selfEnrollmentCode: 'sans',
  storageQuota: 15567,
  status: false,
};

export const sampleWithFullData: ICourse = {
  id: 23502,
  courseName: 'gate meh',
  courseCode: 'gracefully',
  courseImagePath: 'phooey so bite',
  courseStartDate: dayjs('2024-06-26T07:34'),
  courseEndDate: dayjs('2024-06-26T08:21'),
  courseFormat: 'impressionable nearest',
  published: true,
  selfEnrollment: true,
  selfEnrollmentCode: 'however lubricate besides',
  storageQuota: 258,
  status: false,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'pfft nor uh-huh',
  courseCode: 'tiptoe',
  courseStartDate: dayjs('2024-06-26T23:05'),
  courseEndDate: dayjs('2024-06-26T08:34'),
  courseFormat: 'if shoo',
  published: true,
  storageQuota: 30848,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
