import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 23987,
};

export const sampleWithPartialData: IQuizResult = {
  id: 15230,
  point: 17018,
  totalQuestionCnt: 22015,
  wrongAnswerCnt: 14052,
};

export const sampleWithFullData: IQuizResult = {
  id: 3160,
  point: 19301,
  totalQuestionCnt: 2585,
  correctAnswerCnt: 3690,
  wrongAnswerCnt: 27803,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
