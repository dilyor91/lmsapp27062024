import { ICommunityCourse, NewCommunityCourse } from './community-course.model';

export const sampleWithRequiredData: ICommunityCourse = {
  id: 1772,
};

export const sampleWithPartialData: ICommunityCourse = {
  id: 26349,
};

export const sampleWithFullData: ICommunityCourse = {
  id: 19789,
};

export const sampleWithNewData: NewCommunityCourse = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
