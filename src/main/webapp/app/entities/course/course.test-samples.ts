import dayjs from 'dayjs/esm';

import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 10902,
  courseName: 'frightening wetsuit',
  courseCode: 'even deposit',
  courseStartDate: dayjs('2024-06-27T06:13'),
  courseEndDate: dayjs('2024-06-26T22:03'),
  courseFormat: 'normal what worth',
  published: false,
  storageQuota: 5768,
  status: true,
};

export const sampleWithPartialData: ICourse = {
  id: 22395,
  courseName: 'ugh gullible',
  courseCode: 'bumpy',
  courseImagePath: 'relay',
  courseStartDate: dayjs('2024-06-26T23:33'),
  courseEndDate: dayjs('2024-06-26T13:37'),
  courseFormat: 'hex courageously',
  published: false,
  storageQuota: 31597,
  status: true,
};

export const sampleWithFullData: ICourse = {
  id: 6299,
  courseName: 'because vertigo',
  courseCode: 'disband',
  courseImagePath: 'royal',
  courseStartDate: dayjs('2024-06-27T00:12'),
  courseEndDate: dayjs('2024-06-26T13:56'),
  courseFormat: 'or meanwhile chicken',
  published: false,
  selfEnrollment: true,
  selfEnrollmentCode: 'fret monthly',
  storageQuota: 12817,
  status: true,
};

export const sampleWithNewData: NewCourse = {
  courseName: 'worth',
  courseCode: 'attempt perfumed spirituality',
  courseStartDate: dayjs('2024-06-26T17:56'),
  courseEndDate: dayjs('2024-06-27T05:36'),
  courseFormat: 'deep whether hm',
  published: true,
  storageQuota: 3573,
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
