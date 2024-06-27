import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 2565,
  startDate: dayjs('2024-06-26T17:51'),
  endDate: dayjs('2024-06-26T08:40'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 25138,
  startDate: dayjs('2024-06-26T19:02'),
  endDate: dayjs('2024-06-27T02:53'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 28047,
  startDate: dayjs('2024-06-26T06:55'),
  endDate: dayjs('2024-06-26T17:51'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-27T04:09'),
  endDate: dayjs('2024-06-26T19:26'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
