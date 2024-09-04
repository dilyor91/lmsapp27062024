import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 10141,
  title: 'corrupt ick though',
  content: 'lest ew coliseum',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 4465,
  title: 'multitask signpost',
  content: 'punctually',
  availableUntilDate: dayjs('2024-06-26T08:40'),
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 8880,
  title: 'fondly thread woot',
  content: 'underneath',
  availableFromDate: dayjs('2024-06-27T02:00'),
  availableUntilDate: dayjs('2024-06-26T09:57'),
  published: true,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'majestically',
  content: 'excluding nor',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
