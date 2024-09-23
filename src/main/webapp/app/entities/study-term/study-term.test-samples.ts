import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 5173,
  termName: 'vastly',
  startDate: dayjs('2024-06-28T03:41'),
  endDate: dayjs('2024-06-28T06:16'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 12605,
  termName: 'gee finally validity',
  startDate: dayjs('2024-06-27T15:34'),
  endDate: dayjs('2024-06-28T11:35'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 26384,
  termName: 'furiously',
  startDate: dayjs('2024-06-27T20:24'),
  endDate: dayjs('2024-06-28T03:58'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'madly er circle',
  startDate: dayjs('2024-06-27T13:52'),
  endDate: dayjs('2024-06-28T03:36'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
