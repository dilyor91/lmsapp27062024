import dayjs from 'dayjs/esm';

import { IWikiPage, NewWikiPage } from './wiki-page.model';

export const sampleWithRequiredData: IWikiPage = {
  id: 17514,
};

export const sampleWithPartialData: IWikiPage = {
  id: 16748,
  title: 'with exactly so',
  whoAllowed: 'ANYONE',
  publishedAt: dayjs('2024-06-26T09:48'),
};

export const sampleWithFullData: IWikiPage = {
  id: 21586,
  title: 'adventurously',
  content: 'up putrefy uh-huh',
  whoAllowed: 'TEACHER_AND_STUDENTS',
  addToStudents: false,
  addToStudentsDate: dayjs('2024-06-27T05:25'),
  publishedAt: dayjs('2024-06-26T12:14'),
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
