import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 22100,
  lessonTitle: 'down which',
  startPlanDate: dayjs('2024-06-26T17:30'),
  lessonType: 'Lab',
};

export const sampleWithPartialData: ILesson = {
  id: 8526,
  lessonTitle: 'mockingly ugh',
  startPlanDate: dayjs('2024-06-26T23:23'),
  actualLessonDate: dayjs('2024-06-26T17:29'),
  lessonType: 'Lecture',
};

export const sampleWithFullData: ILesson = {
  id: 16496,
  lessonTitle: 'teeming ick',
  startPlanDate: dayjs('2024-06-26T22:05'),
  actualLessonDate: dayjs('2024-06-27T03:27'),
  lessonType: 'Seminar',
  videoUrl: 'so',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'circa',
  startPlanDate: dayjs('2024-06-26T09:26'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
