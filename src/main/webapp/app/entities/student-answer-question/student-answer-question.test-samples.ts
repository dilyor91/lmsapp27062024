import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 235,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 4801,
  isCorrect: true,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 25825,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
