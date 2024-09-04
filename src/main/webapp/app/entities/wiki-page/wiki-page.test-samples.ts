import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 31447,
};

export const sampleWithPartialData: IWikiPage = {
  id: 18321,
  title: 'delayed',
};

export const sampleWithFullData: IWikiPage = {
  id: 7038,
  title: 'plough overcooked',
  content: 'regarding rivet',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-27T00:41'),
  publishedAt: dayjs('2024-06-27T02:17'),
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
