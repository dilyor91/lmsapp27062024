import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 12316,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 29801,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 15896,
  ordNum: 31067,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
