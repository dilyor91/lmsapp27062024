import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 6339,
};

export const sampleWithPartialData: IStudentOption = {
  id: 17949,
};

export const sampleWithFullData: IStudentOption = {
  id: 12775,
  ordNum: 15838,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
