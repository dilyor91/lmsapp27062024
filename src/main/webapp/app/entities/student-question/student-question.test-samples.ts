import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 30210,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 11280,
  ordNum: 16356,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 27602,
  ordNum: 20129,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
