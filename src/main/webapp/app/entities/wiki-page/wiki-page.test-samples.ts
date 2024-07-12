import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 9816,
};

export const sampleWithPartialData: IWikiPage = {
  id: 23534,
  content: 'ah',
  whoAllowed: 'ANYONE',
  published: true,
  notifyUsersChanges: true,
};

export const sampleWithFullData: IWikiPage = {
  id: 4247,
  title: 'long uh-huh abandoned',
  content: 'before whose yowza',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: true,
  addToStudentsDate: dayjs('2024-06-26T15:51'),
  publishedAt: dayjs('2024-06-27T00:46'),
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
