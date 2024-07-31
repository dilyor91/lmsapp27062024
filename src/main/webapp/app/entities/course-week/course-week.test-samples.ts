import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 20965,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 1075,
  name: 'gripping feast tea',
  published: false,
};

export const sampleWithFullData: ICourseWeek = {
  id: 29754,
  name: 'oof',
  published: true,
  weekDate: dayjs('2024-07-04T05:39'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
