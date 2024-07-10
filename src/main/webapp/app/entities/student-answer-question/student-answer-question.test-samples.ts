import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from './student-answer-question.model';

export const sampleWithRequiredData: IStudentAnswerQuestion = {
  id: 24610,
};

export const sampleWithPartialData: IStudentAnswerQuestion = {
  id: 12651,
  isCorrect: false,
};

export const sampleWithFullData: IStudentAnswerQuestion = {
  id: 26550,
  isCorrect: true,
};

export const sampleWithNewData: NewStudentAnswerQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
