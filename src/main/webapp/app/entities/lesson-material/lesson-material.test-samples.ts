import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 6036,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 31790,
  title: 'immediate boohoo',
  lessonFileType: 'TEXT',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 26893,
  title: 'woefully vainly rapidly',
  description: 'aha exhausted',
  lessonFileType: 'WEB_LINK',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
