import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IQuizCourseSection, NewQuizCourseSection } from '../quiz-course-section.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuizCourseSection for edit and NewQuizCourseSectionFormGroupInput for create.
 */
type QuizCourseSectionFormGroupInput = IQuizCourseSection | PartialWithRequiredKeyOf<NewQuizCourseSection>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IQuizCourseSection | NewQuizCourseSection> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

type QuizCourseSectionFormRawValue = FormValueOf<IQuizCourseSection>;

type NewQuizCourseSectionFormRawValue = FormValueOf<NewQuizCourseSection>;

type QuizCourseSectionFormDefaults = Pick<NewQuizCourseSection, 'id' | 'startDate' | 'endDate'>;

type QuizCourseSectionFormGroupContent = {
  id: FormControl<QuizCourseSectionFormRawValue['id'] | NewQuizCourseSection['id']>;
  startDate: FormControl<QuizCourseSectionFormRawValue['startDate']>;
  endDate: FormControl<QuizCourseSectionFormRawValue['endDate']>;
  course: FormControl<QuizCourseSectionFormRawValue['course']>;
  courseSection: FormControl<QuizCourseSectionFormRawValue['courseSection']>;
  quiz: FormControl<QuizCourseSectionFormRawValue['quiz']>;
};

export type QuizCourseSectionFormGroup = FormGroup<QuizCourseSectionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuizCourseSectionFormService {
  createQuizCourseSectionFormGroup(quizCourseSection: QuizCourseSectionFormGroupInput = { id: null }): QuizCourseSectionFormGroup {
    const quizCourseSectionRawValue = this.convertQuizCourseSectionToQuizCourseSectionRawValue({
      ...this.getFormDefaults(),
      ...quizCourseSection,
    });
    return new FormGroup<QuizCourseSectionFormGroupContent>({
      id: new FormControl(
        { value: quizCourseSectionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startDate: new FormControl(quizCourseSectionRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(quizCourseSectionRawValue.endDate, {
        validators: [Validators.required],
      }),
      course: new FormControl(quizCourseSectionRawValue.course),
      courseSection: new FormControl(quizCourseSectionRawValue.courseSection),
      quiz: new FormControl(quizCourseSectionRawValue.quiz),
    });
  }

  getQuizCourseSection(form: QuizCourseSectionFormGroup): IQuizCourseSection | NewQuizCourseSection {
    return this.convertQuizCourseSectionRawValueToQuizCourseSection(
      form.getRawValue() as QuizCourseSectionFormRawValue | NewQuizCourseSectionFormRawValue,
    );
  }

  resetForm(form: QuizCourseSectionFormGroup, quizCourseSection: QuizCourseSectionFormGroupInput): void {
    const quizCourseSectionRawValue = this.convertQuizCourseSectionToQuizCourseSectionRawValue({
      ...this.getFormDefaults(),
      ...quizCourseSection,
    });
    form.reset(
      {
        ...quizCourseSectionRawValue,
        id: { value: quizCourseSectionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuizCourseSectionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
    };
  }

  private convertQuizCourseSectionRawValueToQuizCourseSection(
    rawQuizCourseSection: QuizCourseSectionFormRawValue | NewQuizCourseSectionFormRawValue,
  ): IQuizCourseSection | NewQuizCourseSection {
    return {
      ...rawQuizCourseSection,
      startDate: dayjs(rawQuizCourseSection.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawQuizCourseSection.endDate, DATE_TIME_FORMAT),
    };
  }

  private convertQuizCourseSectionToQuizCourseSectionRawValue(
    quizCourseSection: IQuizCourseSection | (Partial<NewQuizCourseSection> & QuizCourseSectionFormDefaults),
  ): QuizCourseSectionFormRawValue | PartialWithRequiredKeyOf<NewQuizCourseSectionFormRawValue> {
    return {
      ...quizCourseSection,
      startDate: quizCourseSection.startDate ? quizCourseSection.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: quizCourseSection.endDate ? quizCourseSection.endDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
