import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 17004,
};

export const sampleWithPartialData: IStudentOption = {
  id: 6335,
};

export const sampleWithFullData: IStudentOption = {
  id: 29208,
  ordNum: 13807,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
