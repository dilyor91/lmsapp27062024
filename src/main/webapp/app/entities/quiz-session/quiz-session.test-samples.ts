import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 9883,
};

export const sampleWithPartialData: IQuizSession = {
  id: 20574,
  endTime: dayjs('2024-06-26T09:30'),
};

export const sampleWithFullData: IQuizSession = {
  id: 18096,
  startTime: dayjs('2024-06-26T12:25'),
  endTime: dayjs('2024-06-26T09:41'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
