import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 442,
  startDate: dayjs('2024-06-26T10:48'),
  endDate: dayjs('2024-06-26T17:32'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 15610,
  startDate: dayjs('2024-06-26T18:02'),
  endDate: dayjs('2024-06-26T22:22'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 10815,
  startDate: dayjs('2024-06-27T06:01'),
  endDate: dayjs('2024-06-26T18:54'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T10:18'),
  endDate: dayjs('2024-06-27T04:00'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
