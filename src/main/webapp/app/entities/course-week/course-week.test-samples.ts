import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 605,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 10772,
  published: true,
  weekDate: dayjs('2024-07-03T06:45'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 525,
  name: 'um nasalise barring',
  published: true,
  weekDate: dayjs('2024-07-04T05:49'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
