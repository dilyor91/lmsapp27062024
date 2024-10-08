import { ICommunityCourse, NewCommunityCourse } from './community-course.model';

export const sampleWithRequiredData: ICommunityCourse = {
  id: 3469,
};

export const sampleWithPartialData: ICommunityCourse = {
  id: 5361,
};

export const sampleWithFullData: ICommunityCourse = {
  id: 13080,
};

export const sampleWithNewData: NewCommunityCourse = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
