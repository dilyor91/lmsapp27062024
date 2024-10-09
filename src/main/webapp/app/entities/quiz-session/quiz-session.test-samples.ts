import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 22991,
};

export const sampleWithPartialData: IQuizSession = {
  id: 18206,
};

export const sampleWithFullData: IQuizSession = {
  id: 27153,
  startTime: dayjs('2024-06-26T14:52'),
  endTime: dayjs('2024-06-26T07:16'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
