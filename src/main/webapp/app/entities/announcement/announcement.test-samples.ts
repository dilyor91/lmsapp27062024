import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 9380,
  title: 'famously that icebreaker',
  content: 'voluntarily after',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 28812,
  title: 'whoever',
  content: 'bitterly wonderfully',
  availableFromDate: dayjs('2024-06-26T10:55'),
  availableUntilDate: dayjs('2024-06-26T22:06'),
};

export const sampleWithFullData: IAnnouncement = {
  id: 4141,
  title: 'sparse',
  content: 'colorfully exactly offensively',
  availableFromDate: dayjs('2024-06-26T09:12'),
  availableUntilDate: dayjs('2024-06-27T02:47'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'among',
  content: 'canter yowza',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
