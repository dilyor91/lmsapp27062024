import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 1770,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 19650,
  lessonPerWeek: 1349,
  startDate: dayjs('2024-07-04T05:03'),
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 21756,
  totalWeek: 23355,
  lessonPerWeek: 19534,
  startDate: dayjs('2024-07-03T21:26'),
  weekDayCount: 21315,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
