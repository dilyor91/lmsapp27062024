import { IFaculty } from 'app/entities/faculty/faculty.model';

export interface IBuilding {
  id: number;
  name?: string | null;
  description?: string | null;
  address?: string | null;
  status?: boolean | null;
  faculty?: Pick<IFaculty, 'id'> | null;
}

export type NewBuilding = Omit<IBuilding, 'id'> & { id: null };
