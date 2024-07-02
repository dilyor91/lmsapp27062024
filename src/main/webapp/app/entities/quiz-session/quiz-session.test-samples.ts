import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 19020,
};

export const sampleWithPartialData: IQuizSession = {
  id: 2024,
  endTime: dayjs('2024-06-26T18:11'),
};

export const sampleWithFullData: IQuizSession = {
  id: 13319,
  startTime: dayjs('2024-06-26T23:05'),
  endTime: dayjs('2024-06-26T20:17'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
