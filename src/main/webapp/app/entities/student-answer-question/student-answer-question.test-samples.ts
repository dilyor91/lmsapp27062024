import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 8130,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 2724,
  isCorrect: true,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 32757,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
