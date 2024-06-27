import { ISpeciality } from 'app/entities/speciality/speciality.model';

export interface IGroup {
  id: number;
  name?: string | null;
  speciality?: Pick<ISpeciality, 'id'> | null;
}

export type NewGroup = Omit<IGroup, 'id'> & { id: null };
