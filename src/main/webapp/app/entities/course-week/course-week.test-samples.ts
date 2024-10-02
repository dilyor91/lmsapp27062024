import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 23898,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 13229,
  name: 'huzzah',
};

export const sampleWithFullData: ICourseWeek = {
  id: 2333,
  name: 'yippee sans',
  published: true,
  weekDate: dayjs('2024-07-03T18:34'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
