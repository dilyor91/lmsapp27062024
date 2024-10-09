import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 4540,
};

export const sampleWithPartialData: IQuizResult = {
  id: 18108,
  totalQuestionCnt: 8479,
  wrongAnswerCnt: 1413,
};

export const sampleWithFullData: IQuizResult = {
  id: 26188,
  point: 22909,
  totalQuestionCnt: 18533,
  correctAnswerCnt: 23591,
  wrongAnswerCnt: 12618,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
