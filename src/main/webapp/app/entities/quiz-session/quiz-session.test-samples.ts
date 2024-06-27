import dayjs from 'dayjs/esm';

import { IQuizSession, NewQuizSession } from './quiz-session.model';

export const sampleWithRequiredData: IQuizSession = {
  id: 14909,
};

export const sampleWithPartialData: IQuizSession = {
  id: 26354,
  quizSessionEnum: 'IN_PROGRESS',
};

export const sampleWithFullData: IQuizSession = {
  id: 30089,
  startTime: dayjs('2024-06-26T12:12'),
  endTime: dayjs('2024-06-27T01:07'),
  quizSessionEnum: 'FINISHED',
};

export const sampleWithNewData: NewQuizSession = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
