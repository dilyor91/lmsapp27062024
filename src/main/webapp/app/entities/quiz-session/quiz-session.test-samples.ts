import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 13225,
};

export const sampleWithPartialData: IQuizSession = {
  id: 14976,
  quizSessionEnum: 'FINISHED',
};

export const sampleWithFullData: IQuizSession = {
  id: 13498,
  startTime: dayjs('2024-06-27T04:28'),
  endTime: dayjs('2024-06-27T03:26'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
