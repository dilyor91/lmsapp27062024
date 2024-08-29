import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILessonMaterial, NewLessonMaterial } from '../lesson-material.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILessonMaterial for edit and NewLessonMaterialFormGroupInput for create.
 */
type LessonMaterialFormGroupInput = ILessonMaterial | PartialWithRequiredKeyOf<NewLessonMaterial>;

type LessonMaterialFormDefaults = Pick<NewLessonMaterial, 'id'>;

type LessonMaterialFormGroupContent = {
  id: FormControl<ILessonMaterial['id'] | NewLessonMaterial['id']>;
  title: FormControl<ILessonMaterial['title']>;
  description: FormControl<ILessonMaterial['description']>;
  lessonFileType: FormControl<ILessonMaterial['lessonFileType']>;
  attachment: FormControl<ILessonMaterial['attachment']>;
  lesson: FormControl<ILessonMaterial['lesson']>;
};

export type LessonMaterialFormGroup = FormGroup<LessonMaterialFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LessonMaterialFormService {
  createLessonMaterialFormGroup(lessonMaterial: LessonMaterialFormGroupInput = { id: null }): LessonMaterialFormGroup {
    const lessonMaterialRawValue = {
      ...this.getFormDefaults(),
      ...lessonMaterial,
    };
    return new FormGroup<LessonMaterialFormGroupContent>({
      id: new FormControl(
        { value: lessonMaterialRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(lessonMaterialRawValue.title),
      description: new FormControl(lessonMaterialRawValue.description),
      lessonFileType: new FormControl(lessonMaterialRawValue.lessonFileType),
      attachment: new FormControl(lessonMaterialRawValue.attachment),
      lesson: new FormControl(lessonMaterialRawValue.lesson),
    });
  }

  getLessonMaterial(form: LessonMaterialFormGroup): ILessonMaterial | NewLessonMaterial {
    return form.getRawValue() as ILessonMaterial | NewLessonMaterial;
  }

  resetForm(form: LessonMaterialFormGroup, lessonMaterial: LessonMaterialFormGroupInput): void {
    const lessonMaterialRawValue = { ...this.getFormDefaults(), ...lessonMaterial };
    form.reset(
      {
        ...lessonMaterialRawValue,
        id: { value: lessonMaterialRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LessonMaterialFormDefaults {
    return {
      id: null,
    };
  }
}
