import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 3583,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 21873,
  questionCount: 26258,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 16457,
  questionCount: 32411,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
