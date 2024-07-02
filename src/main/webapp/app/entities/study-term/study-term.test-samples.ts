import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 19129,
  termName: 'elbow commission wary',
  startDate: dayjs('2024-06-27T16:33'),
  endDate: dayjs('2024-06-28T04:18'),
  status: false,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 30595,
  termName: 'difficult',
  startDate: dayjs('2024-06-27T21:32'),
  endDate: dayjs('2024-06-28T07:01'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 21017,
  termName: 'pace',
  startDate: dayjs('2024-06-27T13:55'),
  endDate: dayjs('2024-06-28T08:00'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'purple hypochondria',
  startDate: dayjs('2024-06-28T05:34'),
  endDate: dayjs('2024-06-27T15:25'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
