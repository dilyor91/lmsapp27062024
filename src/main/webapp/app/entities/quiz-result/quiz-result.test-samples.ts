import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 24874,
};

export const sampleWithPartialData: IQuizResult = {
  id: 28948,
  point: 24932,
  totalQuestionCnt: 28366,
  correctAnswerCnt: 20012,
  wrongAnswerCnt: 26323,
};

export const sampleWithFullData: IQuizResult = {
  id: 21794,
  point: 15417,
  totalQuestionCnt: 5383,
  correctAnswerCnt: 26347,
  wrongAnswerCnt: 24340,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
