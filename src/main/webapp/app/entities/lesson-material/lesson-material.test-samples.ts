import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 27370,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 8707,
  title: 'trick notwithstanding yum',
  description: 'yuck monthly why',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 27068,
  title: 'rename',
  description: 'save even upwardly',
  lessonFileType: 'TEXT',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
