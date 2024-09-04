import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 17323,
};

export const sampleWithPartialData: IQuizResult = {
  id: 1709,
  correctAnswerCnt: 31397,
};

export const sampleWithFullData: IQuizResult = {
  id: 29264,
  point: 5404,
  totalQuestionCnt: 6033,
  correctAnswerCnt: 5808,
  wrongAnswerCnt: 30457,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
