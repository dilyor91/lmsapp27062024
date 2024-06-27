import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../wiki-page.test-samples';

import { WikiPageFormService } from './wiki-page-form.service';

describe('WikiPage Form Service', () => {
  let service: WikiPageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiPageFormService);
  });

  describe('Service methods', () => {
    describe('createWikiPageFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWikiPageFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            whoAllowed: expect.any(Object),
            addToStudents: expect.any(Object),
            addToStudentsDate: expect.any(Object),
            publishedAt: expect.any(Object),
            published: expect.any(Object),
            notifyUsersChanges: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing IWikiPage should create a new form with FormGroup', () => {
        const formGroup = service.createWikiPageFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            whoAllowed: expect.any(Object),
            addToStudents: expect.any(Object),
            addToStudentsDate: expect.any(Object),
            publishedAt: expect.any(Object),
            published: expect.any(Object),
            notifyUsersChanges: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getWikiPage', () => {
      it('should return NewWikiPage for default WikiPage initial value', () => {
        const formGroup = service.createWikiPageFormGroup(sampleWithNewData);

        const wikiPage = service.getWikiPage(formGroup) as any;

        expect(wikiPage).toMatchObject(sampleWithNewData);
      });

      it('should return NewWikiPage for empty WikiPage initial value', () => {
        const formGroup = service.createWikiPageFormGroup();

        const wikiPage = service.getWikiPage(formGroup) as any;

        expect(wikiPage).toMatchObject({});
      });

      it('should return IWikiPage', () => {
        const formGroup = service.createWikiPageFormGroup(sampleWithRequiredData);

        const wikiPage = service.getWikiPage(formGroup) as any;

        expect(wikiPage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWikiPage should not enable id FormControl', () => {
        const formGroup = service.createWikiPageFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWikiPage should disable id FormControl', () => {
        const formGroup = service.createWikiPageFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
