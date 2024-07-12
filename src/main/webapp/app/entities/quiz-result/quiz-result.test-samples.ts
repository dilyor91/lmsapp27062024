import { IQuizResult, NewQuizResult } from './quiz-result.model';

export const sampleWithRequiredData: IQuizResult = {
  id: 10613,
};

export const sampleWithPartialData: IQuizResult = {
  id: 19274,
  correctAnswerCnt: 4959,
  wrongAnswerCnt: 10835,
};

export const sampleWithFullData: IQuizResult = {
  id: 4397,
  point: 5032,
  totalQuestionCnt: 14138,
  correctAnswerCnt: 5616,
  wrongAnswerCnt: 7969,
};

export const sampleWithNewData: NewQuizResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
