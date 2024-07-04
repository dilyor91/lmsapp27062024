import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 27247,
  quizName: 'cooked',
  timeInMinute: 5966,
};

export const sampleWithPartialData: IQuiz = {
  id: 18035,
  quizName: 'editor on',
  timeInMinute: 17309,
  published: false,
};

export const sampleWithFullData: IQuiz = {
  id: 13902,
  quizName: 'big clavier',
  timeInMinute: 15702,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'blink',
  timeInMinute: 18342,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
