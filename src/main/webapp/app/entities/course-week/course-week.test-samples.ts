import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 7601,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 31680,
  published: true,
  weekDate: dayjs('2024-07-03T16:27'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 10253,
  name: 'energetically',
  published: true,
  weekDate: dayjs('2024-07-03T17:26'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
