import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 28448,
  quizName: 'finally',
  timeInMinute: 23458,
};

export const sampleWithPartialData: IQuiz = {
  id: 32236,
  quizName: 'phooey hallucinate',
  timeInMinute: 27560,
  published: false,
};

export const sampleWithFullData: IQuiz = {
  id: 1396,
  quizName: 'acidly supposing pace',
  timeInMinute: 456,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'fatally',
  timeInMinute: 12171,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
