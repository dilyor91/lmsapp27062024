import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 1771,
};

export const sampleWithPartialData: IWikiPage = {
  id: 29506,
  title: 'to why whoa',
  addToStudents: false,
  publishedAt: dayjs('2024-06-26T06:38'),
  published: false,
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 4986,
  title: 'usefully quick duh',
  content: 'upside-down pfft',
  whoAllowed: 'ANYONE',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T17:41'),
  publishedAt: dayjs('2024-06-26T10:14'),
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
