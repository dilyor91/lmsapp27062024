import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 5542,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 1852,
  totalWeek: 12323,
  startDate: dayjs('2024-07-04T05:18'),
  weekDayCount: 28779,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 11698,
  totalWeek: 12245,
  lessonPerWeek: 24969,
  startDate: dayjs('2024-07-03T19:46'),
  weekDayCount: 31317,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
