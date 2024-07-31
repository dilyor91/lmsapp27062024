import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 27629,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 29844,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 902,
  questionCount: 16715,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
