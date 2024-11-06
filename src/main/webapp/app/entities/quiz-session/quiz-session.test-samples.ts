import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 29586,
};

export const sampleWithPartialData: IQuizSession = {
  id: 32333,
};

export const sampleWithFullData: IQuizSession = {
  id: 31680,
  startTime: dayjs('2024-06-27T00:33'),
  endTime: dayjs('2024-06-26T16:03'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
