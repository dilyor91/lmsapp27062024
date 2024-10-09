import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 3570,
  termName: 'athwart schematise everlasting',
  startDate: dayjs('2024-06-27T22:50'),
  endDate: dayjs('2024-06-28T02:29'),
  status: false,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 26099,
  termName: 'greatly',
  startDate: dayjs('2024-06-28T12:00'),
  endDate: dayjs('2024-06-28T10:01'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 11961,
  termName: 'furlough',
  startDate: dayjs('2024-06-27T19:48'),
  endDate: dayjs('2024-06-28T05:12'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'rise handle',
  startDate: dayjs('2024-06-28T03:15'),
  endDate: dayjs('2024-06-28T00:56'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
