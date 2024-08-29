import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 23840,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 30793,
  published: false,
  weekDate: dayjs('2024-07-03T07:50'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 19734,
  name: 'awkward summon smite',
  published: true,
  weekDate: dayjs('2024-07-03T17:49'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
