import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 12179,
  comment: 'incinerate',
  commentDate: dayjs('2024-07-11T17:48'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 4333,
  comment: 'wherever',
  commentDate: dayjs('2024-07-11T11:26'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 29882,
  comment: 'oof bonnet indeed',
  commentDate: dayjs('2024-07-11T13:07'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'notwithstanding considering briskly',
  commentDate: dayjs('2024-07-11T21:35'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
