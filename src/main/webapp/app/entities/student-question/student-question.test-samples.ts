import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 27870,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 13794,
  ordNum: 13504,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 594,
  ordNum: 7112,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
