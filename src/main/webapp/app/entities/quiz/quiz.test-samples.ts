import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 9259,
  quizName: 'er',
  timeInMinute: 30808,
};

export const sampleWithPartialData: IQuiz = {
  id: 3034,
  quizName: 'good-natured',
  timeInMinute: 16884,
};

export const sampleWithFullData: IQuiz = {
  id: 26761,
  quizName: 'essential boss',
  timeInMinute: 31909,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'fooey reproachfully to',
  timeInMinute: 8157,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
