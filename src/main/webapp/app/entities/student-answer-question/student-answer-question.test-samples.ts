import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 17207,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 1028,
  isCorrect: false,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 10968,
  isCorrect: false,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
