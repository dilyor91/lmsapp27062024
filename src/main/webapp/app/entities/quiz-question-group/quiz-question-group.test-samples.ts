import { IQuizQuestionGroup, NewQuizQuestionGroup } from './quiz-question-group.model';

export const sampleWithRequiredData: IQuizQuestionGroup = {
  id: 29265,
};

export const sampleWithPartialData: IQuizQuestionGroup = {
  id: 13135,
  questionCount: 21782,
};

export const sampleWithFullData: IQuizQuestionGroup = {
  id: 19697,
  questionCount: 5141,
};

export const sampleWithNewData: NewQuizQuestionGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
