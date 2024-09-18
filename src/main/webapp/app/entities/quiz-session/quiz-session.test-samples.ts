import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 22140,
};

export const sampleWithPartialData: IQuizSession = {
  id: 13626,
  startTime: dayjs('2024-06-27T03:22'),
  endTime: dayjs('2024-06-26T18:11'),
};

export const sampleWithFullData: IQuizSession = {
  id: 19634,
  startTime: dayjs('2024-06-26T08:33'),
  endTime: dayjs('2024-06-26T06:58'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
