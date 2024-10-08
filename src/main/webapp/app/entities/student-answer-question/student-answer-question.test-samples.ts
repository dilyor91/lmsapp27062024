import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 7100,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 2197,
  isCorrect: false,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 9004,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
