import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 21134,
  quizName: 'ew deck since',
  timeInMinute: 32163,
};

export const sampleWithPartialData: IQuiz = {
  id: 19047,
  quizName: 'gee however near',
  timeInMinute: 3801,
};

export const sampleWithFullData: IQuiz = {
  id: 24938,
  quizName: 'waterlogged knavishly',
  timeInMinute: 24123,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'hovercraft',
  timeInMinute: 15186,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
