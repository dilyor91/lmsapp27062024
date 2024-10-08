import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 5911,
  quizName: 't-shirt crowded',
  timeInMinute: 27167,
};

export const sampleWithPartialData: IQuiz = {
  id: 12921,
  quizName: 'huzzah',
  timeInMinute: 26013,
  published: true,
};

export const sampleWithFullData: IQuiz = {
  id: 25071,
  quizName: 'short bravely yuck',
  timeInMinute: 4344,
  published: true,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'desecrate bookcase sightseeing',
  timeInMinute: 10637,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
