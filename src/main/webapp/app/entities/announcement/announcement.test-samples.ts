import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 27015,
  title: 'oof strong unveil',
  content: 'phew',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 7909,
  title: 'lamb against',
  content: 'rectangular',
  attachmentId: 7215,
  delayPost: true,
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 7016,
  title: 'drat',
  content: 'weird',
  attachmentId: 21159,
  delayPost: true,
  postAt: dayjs('2024-06-27T00:14'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'hesitation ugh',
  content: 'astride',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
