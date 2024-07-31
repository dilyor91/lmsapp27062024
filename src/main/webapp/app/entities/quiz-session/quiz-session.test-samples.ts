import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 12643,
};

export const sampleWithPartialData: IQuizSession = {
  id: 25022,
  startTime: dayjs('2024-06-27T06:20'),
};

export const sampleWithFullData: IQuizSession = {
  id: 10553,
  startTime: dayjs('2024-06-26T18:29'),
  endTime: dayjs('2024-06-26T11:33'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
