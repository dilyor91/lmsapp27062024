import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 1191,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 18698,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 22219,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
