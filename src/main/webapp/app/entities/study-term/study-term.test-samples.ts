import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 15844,
  termName: 'forenenst',
  startDate: dayjs('2024-06-28T02:12'),
  endDate: dayjs('2024-06-28T01:48'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 23252,
  termName: 'until psst',
  startDate: dayjs('2024-06-28T05:53'),
  endDate: dayjs('2024-06-28T06:30'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 32653,
  termName: 'though terraform',
  startDate: dayjs('2024-06-27T15:38'),
  endDate: dayjs('2024-06-27T21:47'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'substantial',
  startDate: dayjs('2024-06-28T08:49'),
  endDate: dayjs('2024-06-28T01:04'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
