import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 31740,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 30481,
};

export const sampleWithFullData: ILessonMaterial = {
  id: 25139,
  title: 'round scramble',
  description: 'international save aha',
  lessonFileType: 'WEB_LINK',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
