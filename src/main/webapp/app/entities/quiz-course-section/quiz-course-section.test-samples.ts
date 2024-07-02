import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 4641,
  startDate: dayjs('2024-06-27T03:11'),
  endDate: dayjs('2024-06-26T15:03'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 2886,
  startDate: dayjs('2024-06-26T19:02'),
  endDate: dayjs('2024-06-26T13:51'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 31094,
  startDate: dayjs('2024-06-26T15:48'),
  endDate: dayjs('2024-06-26T22:40'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T21:01'),
  endDate: dayjs('2024-06-26T14:47'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
