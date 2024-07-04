import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 27404,
};

export const sampleWithPartialData: IQuizSession = {
  id: 9030,
  startTime: dayjs('2024-06-26T20:48'),
};

export const sampleWithFullData: IQuizSession = {
  id: 13920,
  startTime: dayjs('2024-06-27T01:27'),
  endTime: dayjs('2024-06-26T10:10'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
