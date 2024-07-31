import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 14862,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 12701,
  title: 'readily',
  lessonFileType: 'WEB_LINK',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 2626,
  title: 'even froth though',
  description: 'gah by',
  lessonFileType: 'FILE',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
