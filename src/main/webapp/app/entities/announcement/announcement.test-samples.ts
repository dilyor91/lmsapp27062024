import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 2542,
  title: 'and ghost cosset',
  content: 'muddy boastfully',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 6089,
  title: 'known programme',
  content: 'far exterior despite',
};

export const sampleWithFullData: IAnnouncement = {
  id: 19744,
  title: 'astride uncommon shrilly',
  content: 'sans meanwhile fearless',
  availableFromDate: dayjs('2024-06-26T07:21'),
  availableUntilDate: dayjs('2024-06-26T14:33'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'gadzooks',
  content: 'whose while pfft',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
