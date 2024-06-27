import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { IQuiz } from 'app/entities/quiz/quiz.model';

export interface IQuizCourseSection {
  id: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  course?: Pick<ICourse, 'id'> | null;
  courseSection?: Pick<ICourseSection, 'id'> | null;
  quiz?: Pick<IQuiz, 'id'> | null;
}

export type NewQuizCourseSection = Omit<IQuizCourseSection, 'id'> & { id: null };
