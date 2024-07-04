import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 4144,
  termName: 'descendant abnormally',
  startDate: dayjs('2024-06-27T16:58'),
  endDate: dayjs('2024-06-28T08:45'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 18865,
  termName: 'muster',
  startDate: dayjs('2024-06-27T16:14'),
  endDate: dayjs('2024-06-28T03:34'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 15300,
  termName: 'mmm aw modification',
  startDate: dayjs('2024-06-28T09:32'),
  endDate: dayjs('2024-06-28T07:50'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'what hydrate',
  startDate: dayjs('2024-06-27T20:38'),
  endDate: dayjs('2024-06-27T19:46'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
