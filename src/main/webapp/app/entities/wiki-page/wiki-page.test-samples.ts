import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 994,
};

export const sampleWithPartialData: IWikiPage = {
  id: 25751,
  content: 'searchingly ghost with',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T20:52'),
  publishedAt: dayjs('2024-06-26T20:42'),
  published: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 21816,
  title: 'everlasting',
  content: 'gee hope',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-27T01:05'),
  publishedAt: dayjs('2024-06-27T02:15'),
  published: false,
  notifyUsersChanges: false,
};

export const sampleWithNewData: NewWikiPage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
