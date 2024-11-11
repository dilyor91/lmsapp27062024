import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 26133,
};

export const sampleWithPartialData: IWikiPage = {
  id: 20837,
  title: 'gust',
  content: 'uncover creaking',
  whoAllowed: 'ONLY_TEACHERS',
  addToStudents: false,
  published: false,
  notifyUsersChanges: true,
};

export const sampleWithFullData: IWikiPage = {
  id: 25072,
  title: 'phew respectful plus',
  content: 'duffel if',
  whoAllowed: 'ANYONE',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T07:44'),
  publishedAt: dayjs('2024-06-27T04:56'),
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
