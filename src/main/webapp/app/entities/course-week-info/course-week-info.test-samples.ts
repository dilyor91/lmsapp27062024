import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 31907,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 27416,
  lessonPerWeek: 2840,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 25381,
  totalWeek: 6053,
  lessonPerWeek: 17700,
  startDate: dayjs('2024-07-04T04:42'),
  weekDayCount: 11288,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
