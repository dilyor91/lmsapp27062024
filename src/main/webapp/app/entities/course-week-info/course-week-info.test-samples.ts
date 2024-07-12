import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 27961,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 30643,
  totalWeek: 29740,
  startDate: dayjs('2024-07-03T18:58'),
  weekDayCount: 25070,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 6380,
  totalWeek: 18459,
  lessonPerWeek: 14740,
  startDate: dayjs('2024-07-03T21:58'),
  weekDayCount: 18745,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
