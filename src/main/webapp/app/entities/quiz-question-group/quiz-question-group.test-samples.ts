import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 26237,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 28938,
  questionCount: 18816,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 25451,
  questionCount: 22902,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
