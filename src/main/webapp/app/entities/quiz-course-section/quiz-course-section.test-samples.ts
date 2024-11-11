import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 15507,
  startDate: dayjs('2024-06-27T06:09'),
  endDate: dayjs('2024-06-26T13:13'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 20942,
  startDate: dayjs('2024-06-27T04:41'),
  endDate: dayjs('2024-06-26T13:50'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 4583,
  startDate: dayjs('2024-06-27T01:49'),
  endDate: dayjs('2024-06-26T13:40'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-27T04:19'),
  endDate: dayjs('2024-06-26T17:32'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
