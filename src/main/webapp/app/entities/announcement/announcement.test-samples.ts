import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 9090,
  title: 'tender swiftly till',
  content: 'phew under',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 21482,
  title: 'jovially amidst',
  content: 'by expedition closely',
  attachmentId: 30586,
  published: true,
};

export const sampleWithFullData: IAnnouncement = {
  id: 15726,
  title: 'keenly vainly',
  content: 'incidentally bitterly',
  attachmentId: 25861,
  delayPost: false,
  postAt: dayjs('2024-06-26T16:21'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'till',
  content: 'gah gosh boohoo',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
