import dayjs from 'dayjs/esm';

export interface IStudyAcademicYear {
  id: number;
  fromDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

export type NewStudyAcademicYear = Omit<IStudyAcademicYear, 'id'> & { id: null };
