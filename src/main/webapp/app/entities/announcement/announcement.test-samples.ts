import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 27620,
  title: 'calmly',
  content: 'below eek',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 12470,
  title: 'gurn pace',
  content: 'speedily',
  availableUntilDate: dayjs('2024-06-26T12:14'),
  published: true,
};

export const sampleWithFullData: IAnnouncement = {
  id: 19491,
  title: 'doubtfully lounge premier',
  content: 'brood negligible',
  availableFromDate: dayjs('2024-06-26T09:03'),
  availableUntilDate: dayjs('2024-06-26T21:32'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'refine unto',
  content: 'roughly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
