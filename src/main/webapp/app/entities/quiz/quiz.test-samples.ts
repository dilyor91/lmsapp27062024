import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 13040,
  quizName: 'mmm quirkily ouch',
  timeInMinute: 18403,
};

export const sampleWithPartialData: IQuiz = {
  id: 3186,
  quizName: 'brr meatloaf crossly',
  timeInMinute: 26589,
};

export const sampleWithFullData: IQuiz = {
  id: 6693,
  quizName: 'utter',
  timeInMinute: 6262,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'gadzooks lively',
  timeInMinute: 16798,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
