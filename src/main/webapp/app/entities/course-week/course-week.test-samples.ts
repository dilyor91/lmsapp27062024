import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 2236,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 19457,
  name: 'considering providence gladly',
  weekDate: dayjs('2024-07-03T22:15'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 1831,
  name: 'rise wildly soon',
  published: false,
  weekDate: dayjs('2024-07-03T22:28'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
