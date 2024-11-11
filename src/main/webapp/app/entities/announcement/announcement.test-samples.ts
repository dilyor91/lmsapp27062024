import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 11966,
  title: 'plait atrium usually',
  content: 'syringe',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 28248,
  title: 'gently zowie',
  content: 'glittering psst',
  availableFromDate: dayjs('2024-06-26T07:27'),
  availableUntilDate: dayjs('2024-06-26T06:37'),
};

export const sampleWithFullData: IAnnouncement = {
  id: 25274,
  title: 'until bin as',
  content: 'livid pish thick',
  availableFromDate: dayjs('2024-06-26T23:21'),
  availableUntilDate: dayjs('2024-06-26T16:24'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'lazily cheetah harvest',
  content: 'blah poorly zowie',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
