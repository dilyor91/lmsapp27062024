import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 28189,
};

export const sampleWithPartialData: IWikiPage = {
  id: 2127,
  title: 'before mechanically vitro',
  addToStudentsDate: dayjs('2024-06-26T22:33'),
  published: true,
  notifyUsersChanges: true,
};

export const sampleWithFullData: IWikiPage = {
  id: 24544,
  title: 'unless',
  content: 'dismal youthfully ptarmigan',
  whoAllowed: 'ONLY_TEACHERS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T21:58'),
  publishedAt: dayjs('2024-06-26T19:24'),
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
