import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 424,
  termName: 'never',
  startDate: dayjs('2024-06-27T13:10'),
  endDate: dayjs('2024-06-28T08:48'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 418,
  termName: 'eek solemnly likewise',
  startDate: dayjs('2024-06-27T19:47'),
  endDate: dayjs('2024-06-28T03:24'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 13969,
  termName: 'lacquer opposite',
  startDate: dayjs('2024-06-28T06:45'),
  endDate: dayjs('2024-06-27T13:22'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'lipstick minty uneven',
  startDate: dayjs('2024-06-28T09:37'),
  endDate: dayjs('2024-06-27T19:35'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
