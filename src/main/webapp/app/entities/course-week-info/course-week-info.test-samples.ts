import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 14052,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 21915,
  totalWeek: 20702,
  weekDayCount: 21111,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 19889,
  totalWeek: 15175,
  lessonPerWeek: 32652,
  startDate: dayjs('2024-07-03T13:53'),
  weekDayCount: 6991,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
