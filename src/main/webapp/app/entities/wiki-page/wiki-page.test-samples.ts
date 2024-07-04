import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 7110,
};

export const sampleWithPartialData: IWikiPage = {
  id: 5915,
  whoAllowed: 'ANYONE',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T23:09'),
};

export const sampleWithFullData: IWikiPage = {
  id: 12903,
  title: 'besides',
  content: 'evaporate finally',
  whoAllowed: 'ANYONE',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T10:08'),
  publishedAt: dayjs('2024-06-26T13:40'),
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
