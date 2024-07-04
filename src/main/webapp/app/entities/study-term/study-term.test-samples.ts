import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 10269,
  termName: 'sweetly',
  startDate: dayjs('2024-06-27T13:40'),
  endDate: dayjs('2024-06-28T08:37'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 32615,
  termName: 'dreamily irony however',
  startDate: dayjs('2024-06-27T17:58'),
  endDate: dayjs('2024-06-27T16:00'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 26944,
  termName: 'mean indeed earth',
  startDate: dayjs('2024-06-27T19:07'),
  endDate: dayjs('2024-06-27T23:35'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'but directory',
  startDate: dayjs('2024-06-27T17:30'),
  endDate: dayjs('2024-06-28T08:26'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
