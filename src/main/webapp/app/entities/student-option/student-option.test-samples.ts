import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 9864,
};

export const sampleWithPartialData: IStudentOption = {
  id: 25148,
  ordNum: 20453,
};

export const sampleWithFullData: IStudentOption = {
  id: 163,
  ordNum: 26262,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
