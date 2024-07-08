import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 9364,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 21716,
  totalWeek: 339,
  startDate: dayjs('2024-07-04T02:33'),
  weekDayCount: 13092,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 2112,
  totalWeek: 24465,
  lessonPerWeek: 3153,
  startDate: dayjs('2024-07-03T09:20'),
  weekDayCount: 8810,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
