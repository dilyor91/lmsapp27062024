import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 2325,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 4989,
  isCorrect: true,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 3388,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
