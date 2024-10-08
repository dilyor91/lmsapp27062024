import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 12777,
};

export const sampleWithPartialData: IMessage = {
  id: 27703,
  subject: 'when',
  body: 'loudly ew',
  toAllCourseStudents: false,
  senderDate: dayjs('2024-10-01T16:23'),
  deleted: true,
};

export const sampleWithFullData: IMessage = {
  id: 3900,
  subject: 'er lavish stigmatize',
  body: 'vacantly that minority',
  toAllCourseStudents: true,
  toSectionIds: 'equally descriptive',
  senderDate: dayjs('2024-10-01T09:39'),
  deleted: false,
};

export const sampleWithNewData: NewMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
