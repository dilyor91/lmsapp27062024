import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 4706,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 8420,
  questionCount: 29931,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 8066,
  questionCount: 11415,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
