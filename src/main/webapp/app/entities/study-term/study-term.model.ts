import dayjs from 'dayjs/esm';
import { IStudyAcademicYear } from 'app/entities/study-academic-year/study-academic-year.model';

export interface IStudyTerm {
  id: number;
  termName?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  status?: boolean | null;
  studyAcademicYear?: Pick<IStudyAcademicYear, 'id'> | null;
}

export type NewStudyTerm = Omit<IStudyTerm, 'id'> & { id: null };
