import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 27445,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 24832,
  isCorrect: true,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 5403,
  isCorrect: false,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
