import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 11958,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 3355,
  name: 'gah nougat',
  published: false,
};

export const sampleWithFullData: ICourseWeek = {
  id: 32403,
  name: 'off furiously',
  published: true,
  weekDate: dayjs('2024-07-03T08:18'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
