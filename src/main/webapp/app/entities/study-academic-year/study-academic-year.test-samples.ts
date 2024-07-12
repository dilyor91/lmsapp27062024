import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 9598,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 17001,
  fromDate: dayjs('2024-06-26T19:54'),
  endDate: dayjs('2024-06-27T05:31'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 29175,
  fromDate: dayjs('2024-06-26T14:51'),
  endDate: dayjs('2024-06-26T16:47'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
