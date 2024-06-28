import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 22856,
  quizName: 'versus lazy',
  timeInMinute: 27167,
};

export const sampleWithPartialData: IQuiz = {
  id: 2534,
  quizName: 'enthusiastically till about',
  timeInMinute: 23558,
};

export const sampleWithFullData: IQuiz = {
  id: 5475,
  quizName: 'as',
  timeInMinute: 22996,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'tightly once openly',
  timeInMinute: 1012,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
