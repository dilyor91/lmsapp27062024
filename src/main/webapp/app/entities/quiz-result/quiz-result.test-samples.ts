import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 221,
};

export const sampleWithPartialData: IQuizResult = {
  id: 7335,
};

export const sampleWithFullData: IQuizResult = {
  id: 17202,
  point: 16232,
  totalQuestionCnt: 5849,
  correctAnswerCnt: 22902,
  wrongAnswerCnt: 6077,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
