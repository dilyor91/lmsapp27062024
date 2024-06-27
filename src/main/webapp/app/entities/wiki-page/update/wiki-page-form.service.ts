import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWikiPage, NewWikiPage } from '../wiki-page.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWikiPage for edit and NewWikiPageFormGroupInput for create.
 */
type WikiPageFormGroupInput = IWikiPage | PartialWithRequiredKeyOf<NewWikiPage>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWikiPage | NewWikiPage> = Omit<T, 'addToStudentsDate' | 'publishedAt'> & {
  addToStudentsDate?: string | null;
  publishedAt?: string | null;
};

type WikiPageFormRawValue = FormValueOf<IWikiPage>;

type NewWikiPageFormRawValue = FormValueOf<NewWikiPage>;

type WikiPageFormDefaults = Pick<
  NewWikiPage,
  'id' | 'addToStudents' | 'addToStudentsDate' | 'publishedAt' | 'published' | 'notifyUsersChanges'
>;

type WikiPageFormGroupContent = {
  id: FormControl<WikiPageFormRawValue['id'] | NewWikiPage['id']>;
  title: FormControl<WikiPageFormRawValue['title']>;
  content: FormControl<WikiPageFormRawValue['content']>;
  whoAllowed: FormControl<WikiPageFormRawValue['whoAllowed']>;
  addToStudents: FormControl<WikiPageFormRawValue['addToStudents']>;
  addToStudentsDate: FormControl<WikiPageFormRawValue['addToStudentsDate']>;
  publishedAt: FormControl<WikiPageFormRawValue['publishedAt']>;
  published: FormControl<WikiPageFormRawValue['published']>;
  notifyUsersChanges: FormControl<WikiPageFormRawValue['notifyUsersChanges']>;
  course: FormControl<WikiPageFormRawValue['course']>;
};

export type WikiPageFormGroup = FormGroup<WikiPageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WikiPageFormService {
  createWikiPageFormGroup(wikiPage: WikiPageFormGroupInput = { id: null }): WikiPageFormGroup {
    const wikiPageRawValue = this.convertWikiPageToWikiPageRawValue({
      ...this.getFormDefaults(),
      ...wikiPage,
    });
    return new FormGroup<WikiPageFormGroupContent>({
      id: new FormControl(
        { value: wikiPageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(wikiPageRawValue.title),
      content: new FormControl(wikiPageRawValue.content),
      whoAllowed: new FormControl(wikiPageRawValue.whoAllowed),
      addToStudents: new FormControl(wikiPageRawValue.addToStudents),
      addToStudentsDate: new FormControl(wikiPageRawValue.addToStudentsDate),
      publishedAt: new FormControl(wikiPageRawValue.publishedAt),
      published: new FormControl(wikiPageRawValue.published),
      notifyUsersChanges: new FormControl(wikiPageRawValue.notifyUsersChanges),
      course: new FormControl(wikiPageRawValue.course),
    });
  }

  getWikiPage(form: WikiPageFormGroup): IWikiPage | NewWikiPage {
    return this.convertWikiPageRawValueToWikiPage(form.getRawValue() as WikiPageFormRawValue | NewWikiPageFormRawValue);
  }

  resetForm(form: WikiPageFormGroup, wikiPage: WikiPageFormGroupInput): void {
    const wikiPageRawValue = this.convertWikiPageToWikiPageRawValue({ ...this.getFormDefaults(), ...wikiPage });
    form.reset(
      {
        ...wikiPageRawValue,
        id: { value: wikiPageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WikiPageFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      addToStudents: false,
      addToStudentsDate: currentTime,
      publishedAt: currentTime,
      published: false,
      notifyUsersChanges: false,
    };
  }

  private convertWikiPageRawValueToWikiPage(rawWikiPage: WikiPageFormRawValue | NewWikiPageFormRawValue): IWikiPage | NewWikiPage {
    return {
      ...rawWikiPage,
      addToStudentsDate: dayjs(rawWikiPage.addToStudentsDate, DATE_TIME_FORMAT),
      publishedAt: dayjs(rawWikiPage.publishedAt, DATE_TIME_FORMAT),
    };
  }

  private convertWikiPageToWikiPageRawValue(
    wikiPage: IWikiPage | (Partial<NewWikiPage> & WikiPageFormDefaults),
  ): WikiPageFormRawValue | PartialWithRequiredKeyOf<NewWikiPageFormRawValue> {
    return {
      ...wikiPage,
      addToStudentsDate: wikiPage.addToStudentsDate ? wikiPage.addToStudentsDate.format(DATE_TIME_FORMAT) : undefined,
      publishedAt: wikiPage.publishedAt ? wikiPage.publishedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
