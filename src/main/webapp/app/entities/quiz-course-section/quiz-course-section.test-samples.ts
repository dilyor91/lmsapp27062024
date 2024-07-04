import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 21739,
  startDate: dayjs('2024-06-26T22:43'),
  endDate: dayjs('2024-06-26T16:53'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 5028,
  startDate: dayjs('2024-06-26T19:00'),
  endDate: dayjs('2024-06-26T11:19'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 18575,
  startDate: dayjs('2024-06-26T08:15'),
  endDate: dayjs('2024-06-26T07:03'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T22:57'),
  endDate: dayjs('2024-06-26T20:13'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
