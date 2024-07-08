import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 22871,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 6087,
  isCorrect: true,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 443,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
