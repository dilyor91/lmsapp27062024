import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 18326,
};

export const sampleWithPartialData: IStudentOption = {
  id: 2678,
};

export const sampleWithFullData: IStudentOption = {
  id: 11892,
  ordNum: 27060,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
