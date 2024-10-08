import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 7759,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 30331,
  published: false,
};

export const sampleWithFullData: ICourseWeek = {
  id: 7940,
  name: 'acidly than',
  published: true,
  weekDate: dayjs('2024-07-03T07:50'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
