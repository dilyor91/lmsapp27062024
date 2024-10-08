import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 7729,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 22390,
  fromDate: dayjs('2024-06-27T01:44'),
  endDate: dayjs('2024-06-26T14:53'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 29119,
  fromDate: dayjs('2024-06-26T08:11'),
  endDate: dayjs('2024-06-26T10:42'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
