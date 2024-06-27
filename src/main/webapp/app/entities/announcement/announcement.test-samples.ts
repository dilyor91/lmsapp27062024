import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 16364,
  title: 'often mid',
  content: 'dangerous pish reluctantly',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 27197,
  title: 'which pace',
  content: 'mysteriously',
  delayPost: false,
  postAt: dayjs('2024-06-26T13:19'),
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 12803,
  title: 'after boohoo',
  content: 'ethical accidentally',
  attachmentId: 15005,
  delayPost: true,
  postAt: dayjs('2024-06-26T22:29'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'wherever duh when',
  content: 'worriedly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
