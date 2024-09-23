import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 13556,
};

export const sampleWithPartialData: IQuizResult = {
  id: 8503,
  point: 22998,
  correctAnswerCnt: 11093,
};

export const sampleWithFullData: IQuizResult = {
  id: 1401,
  point: 21939,
  totalQuestionCnt: 5961,
  correctAnswerCnt: 11776,
  wrongAnswerCnt: 3266,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
