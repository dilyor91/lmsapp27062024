import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 25087,
};

export const sampleWithPartialData: IWikiPage = {
  id: 23735,
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-27T02:05'),
  publishedAt: dayjs('2024-06-27T04:22'),
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 8134,
  title: 'recklessly aw',
  content: 'until',
  whoAllowed: 'ONLY_TEACHERS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T09:16'),
  publishedAt: dayjs('2024-06-26T07:26'),
  published: true,
  notifyUsersChanges: true,
};

export const sampleWithNewData: NewWikiPage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
