import dayjs from 'dayjs/esm';

import { ICourseWeek, NewCourseWeek } from './course-week.model';

export const sampleWithRequiredData: ICourseWeek = {
  id: 12970,
};

export const sampleWithPartialData: ICourseWeek = {
  id: 20366,
  name: 'courteous oof blunder',
  weekDate: dayjs('2024-07-03T20:03'),
};

export const sampleWithFullData: ICourseWeek = {
  id: 13781,
  name: 'busily',
  published: true,
  weekDate: dayjs('2024-07-04T02:25'),
};

export const sampleWithNewData: NewCourseWeek = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
