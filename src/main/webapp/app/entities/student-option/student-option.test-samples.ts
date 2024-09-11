import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 15928,
};

export const sampleWithPartialData: IStudentOption = {
  id: 29140,
  ordNum: 16928,
};

export const sampleWithFullData: IStudentOption = {
  id: 9256,
  ordNum: 9075,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
