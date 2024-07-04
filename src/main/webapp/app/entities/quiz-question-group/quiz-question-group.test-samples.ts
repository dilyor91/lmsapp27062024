import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 16763,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 24752,
  questionCount: 2710,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 23410,
  questionCount: 6192,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
