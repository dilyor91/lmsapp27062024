import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 12606,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 22534,
  ordNum: 22832,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 15838,
  ordNum: 30242,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
