import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 22328,
};

export const sampleWithPartialData: IQuizResult = {
  id: 10128,
  point: 20863,
  totalQuestionCnt: 313,
};

export const sampleWithFullData: IQuizResult = {
  id: 29456,
  point: 31130,
  totalQuestionCnt: 31908,
  correctAnswerCnt: 7537,
  wrongAnswerCnt: 24862,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
