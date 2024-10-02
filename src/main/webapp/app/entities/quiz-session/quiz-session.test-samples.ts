import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 17168,
};

export const sampleWithPartialData: IQuizSession = {
  id: 30332,
  startTime: dayjs('2024-06-26T22:45'),
  endTime: dayjs('2024-06-26T18:04'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithFullData: IQuizSession = {
  id: 3205,
  startTime: dayjs('2024-06-26T23:57'),
  endTime: dayjs('2024-06-26T09:42'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
