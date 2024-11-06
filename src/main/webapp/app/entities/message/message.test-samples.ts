import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 18153,
};

export const sampleWithPartialData: IMessage = {
  id: 17795,
  subject: 'fooey yearly colossal',
  toAllCourseStudents: false,
  toSectionIds: 'supposing like ew',
  senderDate: dayjs('2024-10-01T23:49'),
};

export const sampleWithFullData: IMessage = {
  id: 2837,
  subject: 'whoever',
  body: 'institute',
  toAllCourseStudents: false,
  toSectionIds: 'bracelet content',
  senderDate: dayjs('2024-10-01T22:18'),
  deleted: true,
};

export const sampleWithNewData: NewMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
