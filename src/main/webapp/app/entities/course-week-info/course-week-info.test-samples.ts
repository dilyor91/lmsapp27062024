import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 511,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 20243,
  startDate: dayjs('2024-07-03T16:08'),
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 3288,
  totalWeek: 29160,
  lessonPerWeek: 21079,
  startDate: dayjs('2024-07-04T00:19'),
  weekDayCount: 23573,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
