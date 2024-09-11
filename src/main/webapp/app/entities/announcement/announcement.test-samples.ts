import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 16248,
  title: 'positively patrol',
  content: 'mochi definitive whether',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 31960,
  title: 'um oddly sip',
  content: 'naive storey',
};

export const sampleWithFullData: IAnnouncement = {
  id: 25997,
  title: 'vainly ideal',
  content: 'jalapeño tug',
  availableFromDate: dayjs('2024-06-27T01:47'),
  availableUntilDate: dayjs('2024-06-27T05:24'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'watery',
  content: 'sans once ragged',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
