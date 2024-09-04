import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 5866,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 4310,
  lessonPerWeek: 14925,
  weekDayCount: 9840,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 4525,
  totalWeek: 23495,
  lessonPerWeek: 30339,
  startDate: dayjs('2024-07-03T07:52'),
  weekDayCount: 11597,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
