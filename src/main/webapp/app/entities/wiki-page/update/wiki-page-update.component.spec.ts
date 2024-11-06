import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { WikiPageService } from '../service/wiki-page.service';
import { IWikiPage } from '../wiki-page.model';
import { WikiPageFormService } from './wiki-page-form.service';

import { WikiPageUpdateComponent } from './wiki-page-update.component';

describe('WikiPage Management Update Component', () => {
  let comp: WikiPageUpdateComponent;
  let fixture: ComponentFixture<WikiPageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let wikiPageFormService: WikiPageFormService;
  let wikiPageService: WikiPageService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WikiPageUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(WikiPageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WikiPageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    wikiPageFormService = TestBed.inject(WikiPageFormService);
    wikiPageService = TestBed.inject(WikiPageService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const wikiPage: IWikiPage = { id: 456 };
      const course: ICourse = { id: 6834 };
      wikiPage.course = course;

      const courseCollection: ICourse[] = [{ id: 4604 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ wikiPage });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const wikiPage: IWikiPage = { id: 456 };
      const course: ICourse = { id: 904 };
      wikiPage.course = course;

      activatedRoute.data = of({ wikiPage });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.wikiPage).toEqual(wikiPage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWikiPage>>();
      const wikiPage = { id: 123 };
      jest.spyOn(wikiPageFormService, 'getWikiPage').mockReturnValue(wikiPage);
      jest.spyOn(wikiPageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wikiPage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wikiPage }));
      saveSubject.complete();

      // THEN
      expect(wikiPageFormService.getWikiPage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(wikiPageService.update).toHaveBeenCalledWith(expect.objectContaining(wikiPage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWikiPage>>();
      const wikiPage = { id: 123 };
      jest.spyOn(wikiPageFormService, 'getWikiPage').mockReturnValue({ id: null });
      jest.spyOn(wikiPageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wikiPage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wikiPage }));
      saveSubject.complete();

      // THEN
      expect(wikiPageFormService.getWikiPage).toHaveBeenCalled();
      expect(wikiPageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWikiPage>>();
      const wikiPage = { id: 123 };
      jest.spyOn(wikiPageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wikiPage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(wikiPageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourse', () => {
      it('Should forward to courseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
