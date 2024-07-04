import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 15913,
  title: 'under sand gah',
  content: 'joint',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 21018,
  title: 'swimsuit',
  content: 'delightfully ouch until',
  postAt: dayjs('2024-06-26T07:07'),
};

export const sampleWithFullData: IAnnouncement = {
  id: 21859,
  title: 'phooey',
  content: 'hot wordy that',
  attachmentId: 27412,
  delayPost: true,
  postAt: dayjs('2024-06-26T08:26'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'failing brr',
  content: 'consequently elegantly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
