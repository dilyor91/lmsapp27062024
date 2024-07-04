export interface IAttachment {
  id: number;
}

export type NewAttachment = Omit<IAttachment, 'id'> & { id: null };
