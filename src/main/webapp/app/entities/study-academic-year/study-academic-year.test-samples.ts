import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 3547,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 14389,
  fromDate: dayjs('2024-06-26T19:06'),
  endDate: dayjs('2024-06-26T12:17'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 2598,
  fromDate: dayjs('2024-06-27T03:18'),
  endDate: dayjs('2024-06-26T18:05'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
