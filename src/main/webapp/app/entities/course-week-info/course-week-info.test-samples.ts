import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 2146,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 24960,
  totalWeek: 5830,
  lessonPerWeek: 27964,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 9794,
  totalWeek: 26415,
  lessonPerWeek: 3192,
  startDate: dayjs('2024-07-03T10:12'),
  weekDayCount: 5128,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
