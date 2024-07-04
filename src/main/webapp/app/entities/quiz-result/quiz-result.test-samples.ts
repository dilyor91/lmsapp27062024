import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 19952,
};

export const sampleWithPartialData: IQuizResult = {
  id: 29744,
  point: 23782,
  totalQuestionCnt: 24432,
  wrongAnswerCnt: 13043,
};

export const sampleWithFullData: IQuizResult = {
  id: 13155,
  point: 22220,
  totalQuestionCnt: 4821,
  correctAnswerCnt: 12160,
  wrongAnswerCnt: 15832,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
