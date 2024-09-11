import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 28295,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 10395,
  published: false,
};

export const sampleWithFullData: ICourseWeek = {
  id: 22241,
  name: 'mitre',
  published: true,
  weekDate: dayjs('2024-07-04T03:50'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
