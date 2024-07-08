import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 10606,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 7823,
  questionCount: 1884,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 27173,
  questionCount: 20342,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
