import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 27297,
};

export const sampleWithPartialData: IWikiPage = {
  id: 25445,
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 12868,
  title: 'lime',
  content: 'aw',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-27T01:30'),
  publishedAt: dayjs('2024-06-26T20:05'),
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
