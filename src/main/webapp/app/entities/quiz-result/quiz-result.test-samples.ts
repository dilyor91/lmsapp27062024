import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 9446,
};

export const sampleWithPartialData: IQuizResult = {
  id: 28880,
  correctAnswerCnt: 1034,
};

export const sampleWithFullData: IQuizResult = {
  id: 10767,
  point: 3162,
  totalQuestionCnt: 14902,
  correctAnswerCnt: 21964,
  wrongAnswerCnt: 2512,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
