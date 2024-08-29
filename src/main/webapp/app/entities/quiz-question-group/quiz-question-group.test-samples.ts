import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 7373,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 8099,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 13250,
  questionCount: 25848,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
