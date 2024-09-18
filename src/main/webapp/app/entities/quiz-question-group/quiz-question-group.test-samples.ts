import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 8900,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 8863,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 25720,
  questionCount: 4190,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
