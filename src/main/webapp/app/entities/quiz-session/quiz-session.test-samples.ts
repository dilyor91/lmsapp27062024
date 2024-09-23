import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 12004,
};

export const sampleWithPartialData: IQuizSession = {
  id: 13157,
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithFullData: IQuizSession = {
  id: 24762,
  startTime: dayjs('2024-06-26T18:14'),
  endTime: dayjs('2024-06-26T17:45'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
