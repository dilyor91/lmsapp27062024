import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 4798,
  quizName: 'rejuvenate hmph',
  timeInMinute: 27389,
};

export const sampleWithPartialData: IQuiz = {
  id: 9485,
  quizName: 'parchment',
  timeInMinute: 28146,
};

export const sampleWithFullData: IQuiz = {
  id: 520,
  quizName: 'hilarious',
  timeInMinute: 28669,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'pish dimly near',
  timeInMinute: 19735,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
