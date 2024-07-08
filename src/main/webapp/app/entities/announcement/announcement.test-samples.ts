import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 16119,
  title: 'now',
  content: 'plus domesticate',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 6935,
  title: 'shakily',
  content: 'provided alongside',
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 31460,
  title: 'brr skyline sparkling',
  content: 'besides gadzooks',
  attachmentId: 1013,
  delayPost: false,
  postAt: dayjs('2024-06-27T06:08'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'talking hypochondria',
  content: 'trigger',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
