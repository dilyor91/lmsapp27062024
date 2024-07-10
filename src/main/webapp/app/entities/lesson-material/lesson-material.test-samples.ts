import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 19532,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 14375,
  description: 'subsidence',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 28060,
  title: 'noisy',
  description: 'grand',
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
