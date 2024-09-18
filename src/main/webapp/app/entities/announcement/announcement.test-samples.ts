import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 9177,
  title: 'seed',
  content: 'over',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 1708,
  title: 'anti unwieldy rotating',
  content: 'anti wither next',
  availableUntilDate: dayjs('2024-06-26T08:59'),
  published: true,
};

export const sampleWithFullData: IAnnouncement = {
  id: 4326,
  title: 'and',
  content: 'behind consequently',
  availableFromDate: dayjs('2024-06-27T00:14'),
  availableUntilDate: dayjs('2024-06-26T19:14'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'indelible trim',
  content: 'boohoo',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
