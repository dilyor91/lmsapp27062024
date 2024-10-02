import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 23054,
  termName: 'fictionalize solidly',
  startDate: dayjs('2024-06-28T06:23'),
  endDate: dayjs('2024-06-27T15:37'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 20634,
  termName: 'but',
  startDate: dayjs('2024-06-27T20:13'),
  endDate: dayjs('2024-06-27T17:20'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 12542,
  termName: 'usually blue',
  startDate: dayjs('2024-06-27T18:05'),
  endDate: dayjs('2024-06-28T11:22'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'word wherever besides',
  startDate: dayjs('2024-06-27T18:04'),
  endDate: dayjs('2024-06-27T18:10'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
