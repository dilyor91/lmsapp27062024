import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 20812,
  termName: 'creamy sharply barren',
  startDate: dayjs('2024-06-27T19:30'),
  endDate: dayjs('2024-06-28T11:54'),
  status: false,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 29383,
  termName: 'painfully anniversary',
  startDate: dayjs('2024-06-28T01:29'),
  endDate: dayjs('2024-06-28T05:28'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 25536,
  termName: 'silica',
  startDate: dayjs('2024-06-28T06:06'),
  endDate: dayjs('2024-06-28T10:09'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'where declaration inasmuch',
  startDate: dayjs('2024-06-27T16:50'),
  endDate: dayjs('2024-06-27T19:51'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
