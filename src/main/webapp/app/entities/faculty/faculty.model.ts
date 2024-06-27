export interface IFaculty {
  id: number;
  name?: string | null;
}

export type NewFaculty = Omit<IFaculty, 'id'> & { id: null };
