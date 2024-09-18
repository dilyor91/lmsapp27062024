import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 22107,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 28178,
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 21923,
  fromDate: dayjs('2024-06-27T06:08'),
  endDate: dayjs('2024-06-26T20:55'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
