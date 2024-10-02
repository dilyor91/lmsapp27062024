import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 1904,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 10360,
  title: 'toe',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 14603,
  title: 'of',
  description: 'schnitzel vice boring',
  lessonFileType: 'FILE',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
