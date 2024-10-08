import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICommunityCourse, NewCommunityCourse } from '../community-course.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommunityCourse for edit and NewCommunityCourseFormGroupInput for create.
 */
type CommunityCourseFormGroupInput = ICommunityCourse | PartialWithRequiredKeyOf<NewCommunityCourse>;

type CommunityCourseFormDefaults = Pick<NewCommunityCourse, 'id'>;

type CommunityCourseFormGroupContent = {
  id: FormControl<ICommunityCourse['id'] | NewCommunityCourse['id']>;
  community: FormControl<ICommunityCourse['community']>;
  course: FormControl<ICommunityCourse['course']>;
};

export type CommunityCourseFormGroup = FormGroup<CommunityCourseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommunityCourseFormService {
  createCommunityCourseFormGroup(communityCourse: CommunityCourseFormGroupInput = { id: null }): CommunityCourseFormGroup {
    const communityCourseRawValue = {
      ...this.getFormDefaults(),
      ...communityCourse,
    };
    return new FormGroup<CommunityCourseFormGroupContent>({
      id: new FormControl(
        { value: communityCourseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      community: new FormControl(communityCourseRawValue.community),
      course: new FormControl(communityCourseRawValue.course),
    });
  }

  getCommunityCourse(form: CommunityCourseFormGroup): ICommunityCourse | NewCommunityCourse {
    return form.getRawValue() as ICommunityCourse | NewCommunityCourse;
  }

  resetForm(form: CommunityCourseFormGroup, communityCourse: CommunityCourseFormGroupInput): void {
    const communityCourseRawValue = { ...this.getFormDefaults(), ...communityCourse };
    form.reset(
      {
        ...communityCourseRawValue,
        id: { value: communityCourseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommunityCourseFormDefaults {
    return {
      id: null,
    };
  }
}
