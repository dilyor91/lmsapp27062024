import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 6925,
  quizName: 'apropos though',
  timeInMinute: 12202,
};

export const sampleWithPartialData: IQuiz = {
  id: 27404,
  quizName: 'extra-large terribly',
  timeInMinute: 1649,
};

export const sampleWithFullData: IQuiz = {
  id: 14821,
  quizName: 'nearly afraid',
  timeInMinute: 21464,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'fairy',
  timeInMinute: 19262,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
