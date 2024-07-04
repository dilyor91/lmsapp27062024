import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 6815,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 11074,
  questionCount: 16688,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 13178,
  questionCount: 21638,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
