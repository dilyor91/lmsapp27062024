import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 6947,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 1660,
};

export const sampleWithFullData: ICourseWeek = {
  id: 10101,
  name: 'ravioli yet',
  published: true,
  weekDate: dayjs('2024-07-03T07:21'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
