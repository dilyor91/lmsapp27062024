import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 5469,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 12212,
  description: 'nervously',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 27171,
  title: 'excluding jealously atop',
  description: 'zowie shameful',
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
