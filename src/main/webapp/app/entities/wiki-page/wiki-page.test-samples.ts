import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 15782,
};

export const sampleWithPartialData: IWikiPage = {
  id: 7883,
  addToStudents: true,
  published: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 12947,
  title: 'stump instructive',
  content: 'duster pile vanish',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T09:14'),
  publishedAt: dayjs('2024-06-26T16:13'),
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
