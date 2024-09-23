import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 1128,
  quizName: 'utterly',
  timeInMinute: 16618,
};

export const sampleWithPartialData: IQuiz = {
  id: 12703,
  quizName: 'lazy',
  timeInMinute: 30950,
};

export const sampleWithFullData: IQuiz = {
  id: 19981,
  quizName: 'while',
  timeInMinute: 11951,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'until',
  timeInMinute: 2693,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
