import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 11228,
  quizName: 'abaft show',
  timeInMinute: 22520,
};

export const sampleWithPartialData: IQuiz = {
  id: 8160,
  quizName: 'heavily scandalise',
  timeInMinute: 17121,
};

export const sampleWithFullData: IQuiz = {
  id: 21043,
  quizName: 'gee',
  timeInMinute: 31309,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'well-lit',
  timeInMinute: 5671,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
