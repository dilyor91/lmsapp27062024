import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 19399,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 30378,
  questionCount: 19760,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 17131,
  questionCount: 18455,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
