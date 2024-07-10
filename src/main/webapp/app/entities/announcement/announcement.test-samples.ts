import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 7399,
  title: 'whether behind when',
  content: 'woot',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 15823,
  title: 'doss',
  content: 'scarily ethical',
  attachmentId: 28714,
  delayPost: true,
  postAt: dayjs('2024-06-27T05:41'),
};

export const sampleWithFullData: IAnnouncement = {
  id: 14029,
  title: 'scupper',
  content: 'yowza deputise boldly',
  attachmentId: 29637,
  delayPost: true,
  postAt: dayjs('2024-06-26T16:24'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'week uh-huh',
  content: 'hence whose',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
