import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 6963,
};

export const sampleWithPartialData: IQuizSession = {
  id: 19007,
  startTime: dayjs('2024-06-27T05:47'),
  endTime: dayjs('2024-06-27T06:08'),
};

export const sampleWithFullData: IQuizSession = {
  id: 1567,
  startTime: dayjs('2024-06-26T10:07'),
  endTime: dayjs('2024-06-26T14:49'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
