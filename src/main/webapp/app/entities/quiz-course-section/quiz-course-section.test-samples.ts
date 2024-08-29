import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 21080,
  startDate: dayjs('2024-06-26T19:01'),
  endDate: dayjs('2024-06-26T06:42'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 2093,
  startDate: dayjs('2024-06-26T13:07'),
  endDate: dayjs('2024-06-26T16:25'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 18892,
  startDate: dayjs('2024-06-26T11:53'),
  endDate: dayjs('2024-06-26T13:15'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T12:25'),
  endDate: dayjs('2024-06-27T03:32'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
