import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 60,
};

export const sampleWithPartialData: IQuizResult = {
  id: 10629,
  point: 8711,
  totalQuestionCnt: 11803,
  correctAnswerCnt: 26645,
  wrongAnswerCnt: 22058,
};

export const sampleWithFullData: IQuizResult = {
  id: 9040,
  point: 1699,
  totalQuestionCnt: 15121,
  correctAnswerCnt: 14572,
  wrongAnswerCnt: 5353,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
