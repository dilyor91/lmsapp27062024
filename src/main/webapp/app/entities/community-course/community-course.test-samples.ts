import { ICommunityCourse, NewCommunityCourse } from './community-course.model';

export const sampleWithRequiredData: ICommunityCourse = {
  id: 10147,
};

export const sampleWithPartialData: ICommunityCourse = {
  id: 32100,
};

export const sampleWithFullData: ICommunityCourse = {
  id: 16059,
};

export const sampleWithNewData: NewCommunityCourse = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
