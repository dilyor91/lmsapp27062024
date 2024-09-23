import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 5816,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 21006,
  description: 'soon furthermore buck',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 32276,
  title: 'large bare',
  description: 'oddball unnecessarily',
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
