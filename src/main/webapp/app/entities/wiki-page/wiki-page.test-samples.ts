import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 30842,
};

export const sampleWithPartialData: IWikiPage = {
  id: 29512,
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: true,
  notifyUsersChanges: false,
};

export const sampleWithFullData: IWikiPage = {
  id: 28076,
  title: 'rightfully willfully pear',
  content: 'buttonhole',
  whoAllowed: 'ONLY_TEACHERS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-26T09:07'),
  publishedAt: dayjs('2024-06-27T01:24'),
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
