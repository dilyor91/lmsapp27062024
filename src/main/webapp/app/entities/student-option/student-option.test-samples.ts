import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 17378,
};

export const sampleWithPartialData: IStudentOption = {
  id: 1176,
  ordNum: 13590,
};

export const sampleWithFullData: IStudentOption = {
  id: 24862,
  ordNum: 2911,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
