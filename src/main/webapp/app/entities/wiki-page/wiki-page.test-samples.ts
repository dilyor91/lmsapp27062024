import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 20846,
};

export const sampleWithPartialData: IWikiPage = {
  id: 13097,
  title: 'viciously',
  content: 'revelation why',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T13:06'),
  published: false,
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 19537,
  title: 'idolized',
  content: 'clatter whenever carelessly',
  whoAllowed: 'ANYONE',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-27T04:11'),
  publishedAt: dayjs('2024-06-26T15:50'),
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
