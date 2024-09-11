import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 6197,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 25324,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 3648,
  questionCount: 19658,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
