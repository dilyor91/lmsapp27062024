import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 9279,
};

export const sampleWithPartialData: IQuizResult = {
  id: 9837,
  wrongAnswerCnt: 19521,
};

export const sampleWithFullData: IQuizResult = {
  id: 17848,
  point: 13798,
  totalQuestionCnt: 9159,
  correctAnswerCnt: 11547,
  wrongAnswerCnt: 25463,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
