import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';
import { WhoAllowed } from 'app/entities/enumerations/who-allowed.model';

export interface IWikiPage {
  id: number;
  title?: string | null;
  content?: string | null;
  whoAllowed?: keyof typeof WhoAllowed | null;
  addToStudents?: boolean | null;
  addToStudentsDate?: dayjs.Dayjs | null;
  publishedAt?: dayjs.Dayjs | null;
  published?: boolean | null;
  notifyUsersChanges?: boolean | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewWikiPage = Omit<IWikiPage, 'id'> & { id: null };
