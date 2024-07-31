import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 3409,
  comment: 'deign abaft quizzically',
  commentDate: dayjs('2024-07-11T19:37'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 9733,
  comment: 'yuck',
  commentDate: dayjs('2024-07-11T09:34'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 6497,
  comment: 'training',
  commentDate: dayjs('2024-07-11T15:30'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'candid acoustics',
  commentDate: dayjs('2024-07-11T09:58'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
