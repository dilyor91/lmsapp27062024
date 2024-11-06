import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICommunityCourse } from '../community-course.model';
import { CommunityCourseService } from '../service/community-course.service';
import { CommunityCourseFormService } from './community-course-form.service';

import { CommunityCourseUpdateComponent } from './community-course-update.component';

describe('CommunityCourse Management Update Component', () => {
  let comp: CommunityCourseUpdateComponent;
  let fixture: ComponentFixture<CommunityCourseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let communityCourseFormService: CommunityCourseFormService;
  let communityCourseService: CommunityCourseService;
  let communityService: CommunityService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityCourseUpdateComponent],
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
      .overrideTemplate(CommunityCourseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommunityCourseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    communityCourseFormService = TestBed.inject(CommunityCourseFormService);
    communityCourseService = TestBed.inject(CommunityCourseService);
    communityService = TestBed.inject(CommunityService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Community query and add missing value', () => {
      const communityCourse: ICommunityCourse = { id: 456 };
      const community: ICommunity = { id: 8246 };
      communityCourse.community = community;

      const communityCollection: ICommunity[] = [{ id: 12040 }];
      jest.spyOn(communityService, 'query').mockReturnValue(of(new HttpResponse({ body: communityCollection })));
      const additionalCommunities = [community];
      const expectedCollection: ICommunity[] = [...additionalCommunities, ...communityCollection];
      jest.spyOn(communityService, 'addCommunityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityCourse });
      comp.ngOnInit();

      expect(communityService.query).toHaveBeenCalled();
      expect(communityService.addCommunityToCollectionIfMissing).toHaveBeenCalledWith(
        communityCollection,
        ...additionalCommunities.map(expect.objectContaining),
      );
      expect(comp.communitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const communityCourse: ICommunityCourse = { id: 456 };
      const course: ICourse = { id: 16793 };
      communityCourse.course = course;

      const courseCollection: ICourse[] = [{ id: 24185 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityCourse });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const communityCourse: ICommunityCourse = { id: 456 };
      const community: ICommunity = { id: 14795 };
      communityCourse.community = community;
      const course: ICourse = { id: 12788 };
      communityCourse.course = course;

      activatedRoute.data = of({ communityCourse });
      comp.ngOnInit();

      expect(comp.communitiesSharedCollection).toContain(community);
      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.communityCourse).toEqual(communityCourse);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityCourse>>();
      const communityCourse = { id: 123 };
      jest.spyOn(communityCourseFormService, 'getCommunityCourse').mockReturnValue(communityCourse);
      jest.spyOn(communityCourseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityCourse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityCourse }));
      saveSubject.complete();

      // THEN
      expect(communityCourseFormService.getCommunityCourse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(communityCourseService.update).toHaveBeenCalledWith(expect.objectContaining(communityCourse));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityCourse>>();
      const communityCourse = { id: 123 };
      jest.spyOn(communityCourseFormService, 'getCommunityCourse').mockReturnValue({ id: null });
      jest.spyOn(communityCourseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityCourse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityCourse }));
      saveSubject.complete();

      // THEN
      expect(communityCourseFormService.getCommunityCourse).toHaveBeenCalled();
      expect(communityCourseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityCourse>>();
      const communityCourse = { id: 123 };
      jest.spyOn(communityCourseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityCourse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(communityCourseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCommunity', () => {
      it('Should forward to communityService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(communityService, 'compareCommunity');
        comp.compareCommunity(entity, entity2);
        expect(communityService.compareCommunity).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
