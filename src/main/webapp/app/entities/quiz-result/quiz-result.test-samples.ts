import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 13779,
};

export const sampleWithPartialData: IQuizResult = {
  id: 26540,
  totalQuestionCnt: 16404,
  correctAnswerCnt: 27442,
};

export const sampleWithFullData: IQuizResult = {
  id: 5648,
  point: 18001,
  totalQuestionCnt: 27279,
  correctAnswerCnt: 30968,
  wrongAnswerCnt: 5860,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
