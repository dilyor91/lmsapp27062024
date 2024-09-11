import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 506,
};

export const sampleWithPartialData: IWikiPage = {
  id: 28046,
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T21:14'),
  publishedAt: dayjs('2024-06-26T08:19'),
  published: false,
  notifyUsersChanges: true,
};

export const sampleWithFullData: IWikiPage = {
  id: 6488,
  title: 'whoever sarcastic restfully',
  content: 'reasonable than',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T17:51'),
  publishedAt: dayjs('2024-06-27T01:05'),
  published: false,
  notifyUsersChanges: true,
};

export const sampleWithNewData: NewWikiPage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
