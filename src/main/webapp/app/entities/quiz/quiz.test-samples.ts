import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 14575,
  quizName: 'unless',
  timeInMinute: 27970,
};

export const sampleWithPartialData: IQuiz = {
  id: 29681,
  quizName: 'cinch toward',
  timeInMinute: 2069,
  published: true,
};

export const sampleWithFullData: IQuiz = {
  id: 24021,
  quizName: 'while concerning',
  timeInMinute: 14479,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'nautical',
  timeInMinute: 27224,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
