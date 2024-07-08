import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 16793,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 16892,
  fromDate: dayjs('2024-06-26T23:33'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 14944,
  fromDate: dayjs('2024-06-26T19:46'),
  endDate: dayjs('2024-06-27T01:56'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
