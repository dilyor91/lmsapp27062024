import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 29641,
  quizName: 'windy',
  timeInMinute: 13798,
};

export const sampleWithPartialData: IQuiz = {
  id: 27343,
  quizName: 'interact',
  timeInMinute: 6426,
  published: true,
};

export const sampleWithFullData: IQuiz = {
  id: 20892,
  quizName: 'impressionable',
  timeInMinute: 5182,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'incidentally of',
  timeInMinute: 18144,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
