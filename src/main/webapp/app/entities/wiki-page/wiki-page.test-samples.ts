import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 24602,
};

export const sampleWithPartialData: IWikiPage = {
  id: 17344,
  title: 'pro',
  content: 'beyond transfer',
};

export const sampleWithFullData: IWikiPage = {
  id: 18453,
  title: 'regarding minus',
  content: 'likeness till',
  whoAllowed: 'ANYONE',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T06:57'),
  publishedAt: dayjs('2024-06-26T23:29'),
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
