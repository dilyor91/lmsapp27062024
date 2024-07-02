import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 20726,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 10689,
  fromDate: dayjs('2024-06-26T10:11'),
  endDate: dayjs('2024-06-26T15:17'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 9154,
  fromDate: dayjs('2024-06-26T11:51'),
  endDate: dayjs('2024-06-27T05:39'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
