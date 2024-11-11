import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 19077,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 7257,
  questionCount: 25943,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 9293,
  questionCount: 1817,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
