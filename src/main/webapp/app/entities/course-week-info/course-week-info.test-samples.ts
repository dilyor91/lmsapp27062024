import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 23629,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 9662,
  startDate: dayjs('2024-07-03T05:57'),
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 3841,
  totalWeek: 3360,
  lessonPerWeek: 18147,
  startDate: dayjs('2024-07-03T21:19'),
  weekDayCount: 25666,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
