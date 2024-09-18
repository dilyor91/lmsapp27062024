import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 3105,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 13119,
};

export const sampleWithFullData: ILessonMaterial = {
  id: 260,
  title: 'under once academic',
  description: 'against frightfully snorkel',
  lessonFileType: 'WEB_LINK',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
