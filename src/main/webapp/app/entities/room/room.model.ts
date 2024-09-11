import { IBuilding } from 'app/entities/building/building.model';

export interface IRoom {
  id: number;
  name?: string | null;
  description?: string | null;
  capacity?: number | null;
  status?: boolean | null;
  building?: Pick<IBuilding, 'id'> | null;
}

export type NewRoom = Omit<IRoom, 'id'> & { id: null };
