import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 17002,
};

export const sampleWithPartialData: IMessage = {
  id: 26987,
  toAllCourseStudents: false,
};

export const sampleWithFullData: IMessage = {
  id: 23518,
  subject: 'cram',
  body: 'annually nor convalesce',
  toAllCourseStudents: false,
  toSectionIds: 'meatloaf lightly',
  senderDate: dayjs('2024-10-01T06:18'),
  deleted: true,
};

export const sampleWithNewData: NewMessage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
