import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 5085,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 18988,
  description: 'blindly trial',
  lessonFileType: 'PDF',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 29847,
  title: 'shirk successfully',
  description: 'foot above',
  lessonFileType: 'WEB_LINK',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
