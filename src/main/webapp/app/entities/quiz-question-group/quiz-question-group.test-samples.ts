import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 8176,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 1374,
  questionCount: 22057,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 22615,
  questionCount: 31856,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
