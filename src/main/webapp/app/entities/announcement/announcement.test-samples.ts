import dayjs from 'dayjs/esm';

import { IAnnouncement, NewAnnouncement } from './announcement.model';

export const sampleWithRequiredData: IAnnouncement = {
  id: 8464,
  title: 'downplay passivize',
  content: 'unlike commonly',
};

export const sampleWithPartialData: IAnnouncement = {
  id: 26659,
  title: 'taint grand rage',
  content: 'yet wiring sprout',
  attachmentId: 20955,
  published: false,
};

export const sampleWithFullData: IAnnouncement = {
  id: 32655,
  title: 'bruised',
  content: 'oof normalisation',
  attachmentId: 11068,
  delayPost: true,
  postAt: dayjs('2024-06-27T00:01'),
  published: false,
};

export const sampleWithNewData: NewAnnouncement = {
  title: 'hungry about amid',
  content: 'quietly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
