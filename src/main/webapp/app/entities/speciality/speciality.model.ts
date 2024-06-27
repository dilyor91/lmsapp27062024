import { IFaculty } from 'app/entities/faculty/faculty.model';

export interface ISpeciality {
  id: number;
  name?: string | null;
  faculty?: Pick<IFaculty, 'id'> | null;
}

export type NewSpeciality = Omit<ISpeciality, 'id'> & { id: null };
