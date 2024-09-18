import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 24704,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 18435,
  published: false,
};

export const sampleWithFullData: ICourseWeek = {
  id: 26778,
  name: 'glow',
  published: true,
  weekDate: dayjs('2024-07-03T20:52'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
