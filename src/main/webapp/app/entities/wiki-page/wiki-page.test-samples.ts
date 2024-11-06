import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 3612,
};

export const sampleWithPartialData: IWikiPage = {
  id: 13791,
  content: 'besmirch mentor brood',
  whoAllowed: 'ANYONE',
  addToStudentsDate: dayjs('2024-06-26T14:26'),
  publishedAt: dayjs('2024-06-26T15:13'),
  published: true,
  notifyUsersChanges: true,
};

export const sampleWithFullData: IWikiPage = {
  id: 29413,
  title: 'vibrant lighthearted obedient',
  content: 'ha politely blah',
  whoAllowed: 'ONLY_TEACHERS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T14:05'),
  publishedAt: dayjs('2024-06-27T05:13'),
  published: true,
  notifyUsersChanges: false,
};

export const sampleWithNewData: NewWikiPage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
