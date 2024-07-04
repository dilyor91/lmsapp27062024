import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 22210,
};

export const sampleWithPartialData: IStudentOption = {
  id: 5831,
};

export const sampleWithFullData: IStudentOption = {
  id: 1388,
  ordNum: 7537,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
