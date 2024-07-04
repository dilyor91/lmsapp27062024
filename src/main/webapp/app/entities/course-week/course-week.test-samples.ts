import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 23454,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 20538,
  name: 'fitting',
  published: true,
};

export const sampleWithFullData: ICourseWeek = {
  id: 27790,
  name: 'ouch fabulous',
  published: true,
  weekDate: dayjs('2024-07-03T12:08'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
