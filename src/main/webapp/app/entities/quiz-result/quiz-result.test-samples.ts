import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 9840,
};

export const sampleWithPartialData: IQuizResult = {
  id: 11299,
  totalQuestionCnt: 10054,
};

export const sampleWithFullData: IQuizResult = {
  id: 269,
  point: 37,
  totalQuestionCnt: 18100,
  correctAnswerCnt: 4362,
  wrongAnswerCnt: 2437,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
