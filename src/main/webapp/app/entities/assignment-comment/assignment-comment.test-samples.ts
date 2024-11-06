import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 11787,
  comment: 'muffled uh-huh',
  commentDate: dayjs('2024-07-12T02:26'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 7397,
  comment: 'whether',
  commentDate: dayjs('2024-07-11T21:37'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 29951,
  comment: 'netsuke',
  commentDate: dayjs('2024-07-11T15:44'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'even towards',
  commentDate: dayjs('2024-07-11T12:03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
