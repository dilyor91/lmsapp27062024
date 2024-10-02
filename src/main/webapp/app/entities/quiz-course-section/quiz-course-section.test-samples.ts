import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 14302,
  startDate: dayjs('2024-06-27T03:36'),
  endDate: dayjs('2024-06-26T08:21'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 17449,
  startDate: dayjs('2024-06-26T12:15'),
  endDate: dayjs('2024-06-27T04:30'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 695,
  startDate: dayjs('2024-06-26T14:35'),
  endDate: dayjs('2024-06-26T21:19'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T23:13'),
  endDate: dayjs('2024-06-27T00:11'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
