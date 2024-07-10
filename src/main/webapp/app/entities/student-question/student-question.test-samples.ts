import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 7137,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 25328,
  ordNum: 901,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 29401,
  ordNum: 18686,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
