import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 21141,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 19938,
  title: 'whether near',
  description: 'wobbly',
  lessonFileType: 'VIDEO',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 8988,
  title: 'especially geez naughty',
  description: 'washbasin',
  lessonFileType: 'TEXT',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
