import dayjs from 'dayjs/esm';

import { ICourseWeekInfo, NewCourseWeekInfo } from './course-week-info.model';

export const sampleWithRequiredData: ICourseWeekInfo = {
  id: 27438,
};

export const sampleWithPartialData: ICourseWeekInfo = {
  id: 26423,
  weekDayCount: 45,
};

export const sampleWithFullData: ICourseWeekInfo = {
  id: 17822,
  totalWeek: 4558,
  lessonPerWeek: 3277,
  startDate: dayjs('2024-07-03T06:50'),
  weekDayCount: 15878,
};

export const sampleWithNewData: NewCourseWeekInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
