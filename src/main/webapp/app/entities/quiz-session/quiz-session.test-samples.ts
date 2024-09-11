import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 5136,
};

export const sampleWithPartialData: IQuizSession = {
  id: 25751,
  endTime: dayjs('2024-06-27T01:23'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithFullData: IQuizSession = {
  id: 21432,
  startTime: dayjs('2024-06-26T18:07'),
  endTime: dayjs('2024-06-26T15:17'),
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
