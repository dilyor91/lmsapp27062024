import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 20430,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 15381,
};

export const sampleWithFullData: ILessonMaterial = {
  id: 16717,
  title: 'even',
  description: 'govern ticket pocket',
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
