import { IAttachment } from 'app/entities/attachment/attachment.model';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonFileTypeEnum } from 'app/entities/enumerations/lesson-file-type-enum.model';

export interface ILessonMaterial {
  id: number;
  title?: string | null;
  description?: string | null;
  lessonFileType?: keyof typeof LessonFileTypeEnum | null;
  attachment?: Pick<IAttachment, 'id'> | null;
  lesson?: Pick<ILesson, 'id'> | null;
}

export type NewLessonMaterial = Omit<ILessonMaterial, 'id'> & { id: null };
