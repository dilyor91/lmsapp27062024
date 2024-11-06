import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 9105,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 21298,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 16397,
  questionCount: 26736,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
