import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 31298,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 26884,
  isCorrect: true,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 2526,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
