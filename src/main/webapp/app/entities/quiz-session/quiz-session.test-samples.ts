import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 29161,
};

export const sampleWithPartialData: IQuizSession = {
  id: 13960,
  endTime: dayjs('2024-06-27T05:54'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithFullData: IQuizSession = {
  id: 28173,
  startTime: dayjs('2024-06-26T06:25'),
  endTime: dayjs('2024-06-26T06:29'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
