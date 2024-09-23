import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { IBuilding } from 'app/entities/building/building.model';
import { IRoom } from 'app/entities/room/room.model';
import { IStudyTerm } from 'app/entities/study-term/study-term.model';

export interface ITimeTable {
  id: number;
  weekNumber?: number | null;
  weekDayNumber?: number | null;
  pairNumber?: number | null;
  actialDate?: dayjs.Dayjs | null;
  course?: Pick<ICourse, 'id'> | null;
  teacher?: Pick<ITeacher, 'id'> | null;
  building?: Pick<IBuilding, 'id'> | null;
  room?: Pick<IRoom, 'id'> | null;
  studyTerm?: Pick<IStudyTerm, 'id'> | null;
}

export type NewTimeTable = Omit<ITimeTable, 'id'> & { id: null };
