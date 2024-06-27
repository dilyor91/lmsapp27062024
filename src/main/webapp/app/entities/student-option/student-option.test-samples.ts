import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 5414,
};

export const sampleWithPartialData: IStudentOption = {
  id: 2049,
};

export const sampleWithFullData: IStudentOption = {
  id: 1763,
  ordNum: 5853,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
