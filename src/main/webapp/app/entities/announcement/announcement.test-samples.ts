import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 2058,
  title: 'for',
  content: 'ripe',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 23273,
  title: 'valiantly',
  content: 'reprove spiteful',
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 27582,
  title: 'by',
  content: 'sans pfft uh-huh',
  availableFromDate: dayjs('2024-06-26T09:46'),
  availableUntilDate: dayjs('2024-06-26T17:22'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'ah hexagon',
  content: 'taro',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
