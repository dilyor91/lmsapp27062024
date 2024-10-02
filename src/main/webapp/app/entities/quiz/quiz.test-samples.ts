import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 29615,
  quizName: 'around fiercely',
  timeInMinute: 18333,
};

export const sampleWithPartialData: IQuiz = {
  id: 27687,
  quizName: 'whereas',
  timeInMinute: 29951,
};

export const sampleWithFullData: IQuiz = {
  id: 2952,
  quizName: 'before ha',
  timeInMinute: 24502,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'soon shirk fluctuate',
  timeInMinute: 16329,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
