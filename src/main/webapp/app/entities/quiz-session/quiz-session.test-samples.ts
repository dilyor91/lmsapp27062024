import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 7548,
};

export const sampleWithPartialData: IQuizSession = {
  id: 10712,
  startTime: dayjs('2024-06-26T08:28'),
  endTime: dayjs('2024-06-26T09:12'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithFullData: IQuizSession = {
  id: 24424,
  startTime: dayjs('2024-06-26T09:49'),
  endTime: dayjs('2024-06-26T16:57'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
