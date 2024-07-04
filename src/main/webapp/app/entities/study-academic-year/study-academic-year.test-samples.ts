import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 2860,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 15962,
  endDate: dayjs('2024-06-26T06:59'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 6639,
  fromDate: dayjs('2024-06-26T19:47'),
  endDate: dayjs('2024-06-26T08:45'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
