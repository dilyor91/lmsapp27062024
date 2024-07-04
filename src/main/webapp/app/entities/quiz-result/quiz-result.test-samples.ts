import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 11650,
};

export const sampleWithPartialData: IQuizResult = {
  id: 19792,
  point: 10044,
  totalQuestionCnt: 13683,
  wrongAnswerCnt: 11974,
};

export const sampleWithFullData: IQuizResult = {
  id: 25680,
  point: 31257,
  totalQuestionCnt: 29066,
  correctAnswerCnt: 10363,
  wrongAnswerCnt: 4760,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
