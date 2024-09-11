import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 24308,
};

export const sampleWithPartialData: IQuizResult = {
  id: 854,
};

export const sampleWithFullData: IQuizResult = {
  id: 30592,
  point: 4617,
  totalQuestionCnt: 13941,
  correctAnswerCnt: 30979,
  wrongAnswerCnt: 30409,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
