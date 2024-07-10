import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 2959,
};

export const sampleWithPartialData: IStudentOption = {
  id: 9790,
  ordNum: 21686,
};

export const sampleWithFullData: IStudentOption = {
  id: 1991,
  ordNum: 8711,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
