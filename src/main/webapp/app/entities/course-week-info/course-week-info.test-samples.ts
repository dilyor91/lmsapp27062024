import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 24564,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 20458,
  lessonPerWeek: 30060,
  startDate: dayjs('2024-07-03T06:20'),
  weekDayCount: 29325,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 19064,
  totalWeek: 14239,
  lessonPerWeek: 705,
  startDate: dayjs('2024-07-03T18:55'),
  weekDayCount: 27477,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
