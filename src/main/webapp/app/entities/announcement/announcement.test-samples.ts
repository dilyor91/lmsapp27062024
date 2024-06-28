import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 29494,
  title: 'more thoroughly',
  content: 'during',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 18100,
  title: 'cue',
  content: 'bitterly around yum',
  attachmentId: 23415,
  delayPost: false,
  published: true,
};

export const sampleWithFullData: IAnnouncement = {
  id: 29360,
  title: 'promulgate exfoliate',
  content: 'though',
  attachmentId: 10826,
  delayPost: false,
  postAt: dayjs('2024-06-26T07:06'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'jealously incompatible',
  content: 'squelch',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
