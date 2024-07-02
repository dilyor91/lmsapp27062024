import { SubmissionTypeEnum } from 'app/entities/enumerations/submission-type-enum.model';

export interface IAssignment {
  id: number;
  name?: string | null;
  content?: string | null;
  points?: number | null;
  submissionType?: keyof typeof SubmissionTypeEnum | null;
  allowedAttempts?: number | null;
  published?: boolean | null;
}

export type NewAssignment = Omit<IAssignment, 'id'> & { id: null };
