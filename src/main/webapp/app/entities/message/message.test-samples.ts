import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 19806,
};

export const sampleWithPartialData: IMessage = {
  id: 14533,
  subject: 'angrily bobble grave',
  body: 'mathematics',
  toAllCourseStudents: true,
  toSectionIds: 'furthermore',
  senderDate: dayjs('2024-10-01T22:49'),
  deleted: true,
};

export const sampleWithFullData: IMessage = {
  id: 15788,
  subject: 'meh',
  body: 'eek overheard',
  toAllCourseStudents: true,
  toSectionIds: 'mmm',
  senderDate: dayjs('2024-10-01T21:14'),
  deleted: true,
};

export const sampleWithNewData: NewMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
