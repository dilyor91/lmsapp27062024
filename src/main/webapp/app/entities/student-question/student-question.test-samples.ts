import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 15193,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 1470,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 11825,
  ordNum: 6542,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
