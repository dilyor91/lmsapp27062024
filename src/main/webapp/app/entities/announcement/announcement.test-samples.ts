import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 29475,
  title: 'commonly boohoo',
  content: 'unless near step-mother',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 19851,
  title: 'homely understated',
  content: 'meaningfully worthy',
  availableFromDate: dayjs('2024-06-27T02:58'),
  availableUntilDate: dayjs('2024-06-26T11:01'),
  published: true,
};

export const sampleWithFullData: IAnnouncement = {
  id: 24576,
  title: 'colon yowza and',
  content: 'strict midst mmm',
  availableFromDate: dayjs('2024-06-27T01:52'),
  availableUntilDate: dayjs('2024-06-26T12:47'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'zesty debit reckless',
  content: 'drat unto',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
