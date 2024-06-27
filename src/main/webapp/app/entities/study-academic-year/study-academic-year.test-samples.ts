import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 32,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 28614,
  fromDate: dayjs('2024-06-26T06:59'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 15559,
  fromDate: dayjs('2024-06-26T19:03'),
  endDate: dayjs('2024-06-27T06:07'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
