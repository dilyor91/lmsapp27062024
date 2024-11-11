import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 31423,
  quizName: 'stealthily norm zowie',
  timeInMinute: 23115,
};

export const sampleWithPartialData: IQuiz = {
  id: 6387,
  quizName: 'hm courageous promptly',
  timeInMinute: 7,
};

export const sampleWithFullData: IQuiz = {
  id: 20113,
  quizName: 'alongside',
  timeInMinute: 15819,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'biodegrade',
  timeInMinute: 21319,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
