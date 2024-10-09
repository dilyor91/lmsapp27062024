import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 25023,
};

export const sampleWithPartialData: IMessage = {
  id: 21539,
  subject: 'brr conjecture righteously',
  body: 'boyfriend',
  toSectionIds: 'youthful',
};

export const sampleWithFullData: IMessage = {
  id: 11146,
  subject: 'plumber',
  body: 'duh outrageous cuddly',
  toAllCourseStudents: false,
  toSectionIds: 'consequently per',
  senderDate: dayjs('2024-10-01T09:18'),
  deleted: false,
};

export const sampleWithNewData: NewMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
