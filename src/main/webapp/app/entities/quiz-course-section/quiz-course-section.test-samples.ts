import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 26714,
  startDate: dayjs('2024-06-26T20:53'),
  endDate: dayjs('2024-06-26T23:03'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 32382,
  startDate: dayjs('2024-06-26T22:20'),
  endDate: dayjs('2024-06-26T22:37'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 2158,
  startDate: dayjs('2024-06-26T16:42'),
  endDate: dayjs('2024-06-26T09:00'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T22:57'),
  endDate: dayjs('2024-06-26T09:53'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
