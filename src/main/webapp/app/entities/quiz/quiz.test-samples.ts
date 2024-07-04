import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 24270,
  quizName: 'as method',
  timeInMinute: 24344,
};

export const sampleWithPartialData: IQuiz = {
  id: 14552,
  quizName: 'gregarious against',
  timeInMinute: 32303,
  published: false,
};

export const sampleWithFullData: IQuiz = {
  id: 19363,
  quizName: 'full',
  timeInMinute: 14834,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'unabashedly',
  timeInMinute: 27228,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
