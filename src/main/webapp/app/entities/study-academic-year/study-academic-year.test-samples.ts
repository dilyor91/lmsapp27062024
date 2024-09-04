import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 8820,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 309,
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 7292,
  fromDate: dayjs('2024-06-26T10:39'),
  endDate: dayjs('2024-06-26T18:19'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
