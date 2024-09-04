import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 1183,
};

export const sampleWithPartialData: IQuizSession = {
  id: 31497,
  startTime: dayjs('2024-06-26T18:26'),
};

export const sampleWithFullData: IQuizSession = {
  id: 1265,
  startTime: dayjs('2024-06-26T23:30'),
  endTime: dayjs('2024-06-27T04:43'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
