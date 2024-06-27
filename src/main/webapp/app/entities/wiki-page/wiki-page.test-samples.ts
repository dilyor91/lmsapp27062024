import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 14861,
};

export const sampleWithPartialData: IWikiPage = {
  id: 24595,
  content: 'doom cover curl',
  publishedAt: dayjs('2024-06-26T09:48'),
  published: true,
};

export const sampleWithFullData: IWikiPage = {
  id: 8660,
  title: 'wherever',
  content: 'minor which',
  whoAllowed: 'ANYONE',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-27T02:45'),
  publishedAt: dayjs('2024-06-27T02:02'),
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
