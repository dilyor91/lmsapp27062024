import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 2841,
  title: 'spry gaze for',
  content: 'since spiteful boil',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 8117,
  title: 'anti unexpectedly assemble',
  content: 'that',
  delayPost: false,
  postAt: dayjs('2024-06-26T19:19'),
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 17817,
  title: 'geez honestly whether',
  content: 'lie long-term manacle',
  attachmentId: 4908,
  delayPost: true,
  postAt: dayjs('2024-06-26T06:24'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'yowza doll',
  content: 'agitated supposing alligator',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
