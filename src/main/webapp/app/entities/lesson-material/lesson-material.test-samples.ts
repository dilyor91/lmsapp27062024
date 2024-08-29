import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 32464,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 2491,
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 28864,
  title: 'opposite',
  description: 'obnoxiously cocoon giant',
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
