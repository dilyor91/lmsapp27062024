import { ICommunityCourse, NewCommunityCourse } from './community-course.model';

export const sampleWithRequiredData: ICommunityCourse = {
  id: 13427,
};

export const sampleWithPartialData: ICommunityCourse = {
  id: 1474,
};

export const sampleWithFullData: ICommunityCourse = {
  id: 18191,
};

export const sampleWithNewData: NewCommunityCourse = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
