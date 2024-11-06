import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 17345,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 7980,
  totalWeek: 8478,
  startDate: dayjs('2024-07-03T21:00'),
  weekDayCount: 16362,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 32069,
  totalWeek: 22015,
  lessonPerWeek: 22742,
  startDate: dayjs('2024-07-04T03:14'),
  weekDayCount: 7781,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
