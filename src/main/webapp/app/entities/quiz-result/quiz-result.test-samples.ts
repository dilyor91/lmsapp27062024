import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 21273,
};

export const sampleWithPartialData: IQuizResult = {
  id: 2653,
  point: 23878,
};

export const sampleWithFullData: IQuizResult = {
  id: 26506,
  point: 27671,
  totalQuestionCnt: 12109,
  correctAnswerCnt: 726,
  wrongAnswerCnt: 4053,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
