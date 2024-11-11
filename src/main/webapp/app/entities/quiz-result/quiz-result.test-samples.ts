import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 32451,
};

export const sampleWithPartialData: IQuizResult = {
  id: 21958,
  correctAnswerCnt: 14787,
};

export const sampleWithFullData: IQuizResult = {
  id: 4934,
  point: 11052,
  totalQuestionCnt: 27464,
  correctAnswerCnt: 14268,
  wrongAnswerCnt: 25303,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
