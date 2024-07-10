import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 24016,
};

export const sampleWithPartialData: IQuizResult = {
  id: 24666,
  point: 31321,
  correctAnswerCnt: 12006,
};

export const sampleWithFullData: IQuizResult = {
  id: 23201,
  point: 18092,
  totalQuestionCnt: 15754,
  correctAnswerCnt: 29773,
  wrongAnswerCnt: 6545,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
