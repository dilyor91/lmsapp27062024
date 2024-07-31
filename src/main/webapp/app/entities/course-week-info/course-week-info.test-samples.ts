import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 18908,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 13282,
  lessonPerWeek: 18165,
  startDate: dayjs('2024-07-04T04:06'),
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 24276,
  totalWeek: 30468,
  lessonPerWeek: 29906,
  startDate: dayjs('2024-07-03T19:22'),
  weekDayCount: 13824,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
