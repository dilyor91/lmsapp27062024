import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 20464,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 30066,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 32274,
  isCorrect: false,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
