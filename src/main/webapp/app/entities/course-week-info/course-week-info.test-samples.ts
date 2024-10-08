import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 29466,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 3896,
  startDate: dayjs('2024-07-03T08:04'),
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 22151,
  totalWeek: 211,
  lessonPerWeek: 24751,
  startDate: dayjs('2024-07-03T15:58'),
  weekDayCount: 20194,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
