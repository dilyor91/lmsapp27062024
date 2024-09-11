import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 19650,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 32202,
  title: 'palate abnormally however',
  description: 'pish handsome',
  lessonFileType: 'TEXT',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 25174,
  title: 'hm stormy',
  description: 'reminder even',
  lessonFileType: 'WEB_LINK',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
