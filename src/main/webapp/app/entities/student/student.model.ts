import { IStudyAcademicYear } from 'app/entities/study-academic-year/study-academic-year.model';
import { IUser } from 'app/entities/user/user.model';
import { IFaculty } from 'app/entities/faculty/faculty.model';
import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { IGroup } from 'app/entities/group/group.model';
import { TutionTypeEnum } from 'app/entities/enumerations/tution-type-enum.model';
import { EducationLanguage } from 'app/entities/enumerations/education-language.model';
import { EducationType } from 'app/entities/enumerations/education-type.model';
import { EducationForm } from 'app/entities/enumerations/education-form.model';

export interface IStudent {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  gender?: string | null;
  birthdate?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  hemisId?: number | null;
  passportNumber?: string | null;
  jshshir?: string | null;
  isActive?: boolean | null;
  tutionType?: keyof typeof TutionTypeEnum | null;
  nationality?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  addressLine?: string | null;
  course?: number | null;
  semester?: number | null;
  educationLanguage?: keyof typeof EducationLanguage | null;
  educationType?: keyof typeof EducationType | null;
  educationForm?: keyof typeof EducationForm | null;
  studyAcademicYear?: Pick<IStudyAcademicYear, 'id'> | null;
  user?: Pick<IUser, 'id'> | null;
  faculty?: Pick<IFaculty, 'id'> | null;
  speciality?: Pick<ISpeciality, 'id'> | null;
  group?: Pick<IGroup, 'id'> | null;
}

export type NewStudent = Omit<IStudent, 'id'> & { id: null };
