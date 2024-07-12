import { ILessonMaterial, NewLessonMaterial } from './lesson-material.model';

export const sampleWithRequiredData: ILessonMaterial = {
  id: 24515,
};

export const sampleWithPartialData: ILessonMaterial = {
  id: 32470,
  title: 'truthfully truthful',
  description: 'that zowie',
  lessonFileType: 'VIDEO',
};

export const sampleWithFullData: ILessonMaterial = {
  id: 20904,
  title: 'but',
  description: 'sweaty selfishly',
  lessonFileType: 'SOCIAL_MEDIA',
};

export const sampleWithNewData: NewLessonMaterial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
