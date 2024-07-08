import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 4223,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 16016,
  weekDate: dayjs('2024-07-03T15:37'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 15060,
  name: 'frankly duh',
  published: true,
  weekDate: dayjs('2024-07-03T16:11'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
