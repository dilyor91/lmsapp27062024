import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 30535,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 24243,
  weekDate: dayjs('2024-07-03T07:15'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 2256,
  name: 'minor',
  published: true,
  weekDate: dayjs('2024-07-03T14:52'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
