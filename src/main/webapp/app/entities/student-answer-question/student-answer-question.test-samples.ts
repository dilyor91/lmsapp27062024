import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 23373,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 6571,
  isCorrect: false,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 20319,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
