import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 21376,
  quizName: 'even',
  timeInMinute: 17247,
};

export const sampleWithPartialData: IQuiz = {
  id: 3311,
  quizName: 'what yahoo',
  timeInMinute: 17157,
};

export const sampleWithFullData: IQuiz = {
  id: 12683,
  quizName: 'geez ideal',
  timeInMinute: 29823,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'lest finally separately',
  timeInMinute: 32603,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
