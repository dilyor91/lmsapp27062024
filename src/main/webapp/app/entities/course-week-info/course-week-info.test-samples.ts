import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 31607,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 16362,
  totalWeek: 10149,
  startDate: dayjs('2024-07-03T18:33'),
  weekDayCount: 4030,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 25802,
  totalWeek: 15729,
  lessonPerWeek: 2158,
  startDate: dayjs('2024-07-03T08:11'),
  weekDayCount: 1918,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
