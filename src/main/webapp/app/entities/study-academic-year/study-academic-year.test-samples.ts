import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 26667,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 20747,
  endDate: dayjs('2024-06-26T21:35'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 12900,
  fromDate: dayjs('2024-06-26T10:29'),
  endDate: dayjs('2024-06-26T19:12'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
