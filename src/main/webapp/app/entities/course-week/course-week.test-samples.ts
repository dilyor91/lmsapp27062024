import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 575,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 30030,
  weekDate: dayjs('2024-07-03T15:40'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 26787,
  name: 'teeming vainly although',
  published: true,
  weekDate: dayjs('2024-07-04T01:14'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
