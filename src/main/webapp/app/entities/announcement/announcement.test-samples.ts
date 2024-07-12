import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 32051,
  title: 'aboard ferret',
  content: 'midst displacement prestige',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 26781,
  title: 'needily pesky',
  content: 'till however fancy',
  attachmentId: 12796,
};

export const sampleWithFullData: IAnnouncement = {
  id: 21387,
  title: 'a jump hospitality',
  content: 'including honestly',
  attachmentId: 27886,
  delayPost: true,
  postAt: dayjs('2024-06-26T18:34'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'yuck by eaves',
  content: 'wrapper drat meanwhile',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
