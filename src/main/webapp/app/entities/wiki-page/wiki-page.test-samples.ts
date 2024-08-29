import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 19696,
};

export const sampleWithPartialData: IWikiPage = {
  id: 24179,
  title: 'gee aboard',
  content: 'regularly as why',
  addToStudents: true,
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 21015,
  title: 'joyously',
  content: 'french how',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T16:56'),
  publishedAt: dayjs('2024-06-26T20:28'),
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
