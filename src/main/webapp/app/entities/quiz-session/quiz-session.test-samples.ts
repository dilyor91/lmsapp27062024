import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 13649,
};

export const sampleWithPartialData: IQuizSession = {
  id: 6339,
  endTime: dayjs('2024-06-27T05:51'),
};

export const sampleWithFullData: IQuizSession = {
  id: 30949,
  startTime: dayjs('2024-06-27T02:46'),
  endTime: dayjs('2024-06-26T20:23'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
