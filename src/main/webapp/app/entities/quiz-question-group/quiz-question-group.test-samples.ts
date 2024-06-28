import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 16132,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 32559,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 2636,
  questionCount: 16325,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
