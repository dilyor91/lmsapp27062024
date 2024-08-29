import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 3468,
};

export const sampleWithPartialData: IQuizSession = {
  id: 199,
  startTime: dayjs('2024-06-27T05:18'),
  endTime: dayjs('2024-06-26T20:43'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithFullData: IQuizSession = {
  id: 20196,
  startTime: dayjs('2024-06-26T11:39'),
  endTime: dayjs('2024-06-27T06:03'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
