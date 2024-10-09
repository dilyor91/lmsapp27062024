import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 31591,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 2186,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 15311,
  questionCount: 32103,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
