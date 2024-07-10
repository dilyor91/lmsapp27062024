import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 13782,
  quizName: 'pattypan',
  timeInMinute: 26285,
};

export const sampleWithPartialData: IQuiz = {
  id: 25692,
  quizName: 'loosely ricochet pfft',
  timeInMinute: 28649,
};

export const sampleWithFullData: IQuiz = {
  id: 24158,
  quizName: 'immediately',
  timeInMinute: 17262,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'meh worth who',
  timeInMinute: 4610,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
