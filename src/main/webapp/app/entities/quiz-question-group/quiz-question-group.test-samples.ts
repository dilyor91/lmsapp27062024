import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 29745,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 26332,
  questionCount: 13977,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 669,
  questionCount: 29276,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
