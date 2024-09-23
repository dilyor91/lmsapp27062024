import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 2651,
};

export const sampleWithPartialData: IWikiPage = {
  id: 9584,
  content: 'daughter blaspheme',
  whoAllowed: 'ONLY_TEACHERS',
  published: false,
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 29296,
  title: 'under which',
  content: 'absent sympathetically',
  whoAllowed: 'ONLY_TEACHERS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T09:35'),
  publishedAt: dayjs('2024-06-26T09:59'),
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
