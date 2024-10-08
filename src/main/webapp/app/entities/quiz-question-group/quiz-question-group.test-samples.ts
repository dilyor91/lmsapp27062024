import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 22678,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 27738,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 13580,
  questionCount: 14005,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
