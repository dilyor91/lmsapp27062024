import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 5432,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 13864,
  isCorrect: false,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 19760,
  isCorrect: false,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
