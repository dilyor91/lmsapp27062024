import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';
import { ICommunityTag } from '../community-tag.model';
import { CommunityTagService } from '../service/community-tag.service';
import { CommunityTagFormService } from './community-tag-form.service';

import { CommunityTagUpdateComponent } from './community-tag-update.component';

describe('CommunityTag Management Update Component', () => {
  let comp: CommunityTagUpdateComponent;
  let fixture: ComponentFixture<CommunityTagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let communityTagFormService: CommunityTagFormService;
  let communityTagService: CommunityTagService;
  let communityService: CommunityService;
  let tagService: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityTagUpdateComponent],
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
      .overrideTemplate(CommunityTagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommunityTagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    communityTagFormService = TestBed.inject(CommunityTagFormService);
    communityTagService = TestBed.inject(CommunityTagService);
    communityService = TestBed.inject(CommunityService);
    tagService = TestBed.inject(TagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Community query and add missing value', () => {
      const communityTag: ICommunityTag = { id: 456 };
      const community: ICommunity = { id: 28827 };
      communityTag.community = community;

      const communityCollection: ICommunity[] = [{ id: 24902 }];
      jest.spyOn(communityService, 'query').mockReturnValue(of(new HttpResponse({ body: communityCollection })));
      const additionalCommunities = [community];
      const expectedCollection: ICommunity[] = [...additionalCommunities, ...communityCollection];
      jest.spyOn(communityService, 'addCommunityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityTag });
      comp.ngOnInit();

      expect(communityService.query).toHaveBeenCalled();
      expect(communityService.addCommunityToCollectionIfMissing).toHaveBeenCalledWith(
        communityCollection,
        ...additionalCommunities.map(expect.objectContaining),
      );
      expect(comp.communitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tag query and add missing value', () => {
      const communityTag: ICommunityTag = { id: 456 };
      const tag: ITag = { id: 14476 };
      communityTag.tag = tag;

      const tagCollection: ITag[] = [{ id: 3777 }];
      jest.spyOn(tagService, 'query').mockReturnValue(of(new HttpResponse({ body: tagCollection })));
      const additionalTags = [tag];
      const expectedCollection: ITag[] = [...additionalTags, ...tagCollection];
      jest.spyOn(tagService, 'addTagToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityTag });
      comp.ngOnInit();

      expect(tagService.query).toHaveBeenCalled();
      expect(tagService.addTagToCollectionIfMissing).toHaveBeenCalledWith(tagCollection, ...additionalTags.map(expect.objectContaining));
      expect(comp.tagsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const communityTag: ICommunityTag = { id: 456 };
      const community: ICommunity = { id: 9960 };
      communityTag.community = community;
      const tag: ITag = { id: 3932 };
      communityTag.tag = tag;

      activatedRoute.data = of({ communityTag });
      comp.ngOnInit();

      expect(comp.communitiesSharedCollection).toContain(community);
      expect(comp.tagsSharedCollection).toContain(tag);
      expect(comp.communityTag).toEqual(communityTag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityTag>>();
      const communityTag = { id: 123 };
      jest.spyOn(communityTagFormService, 'getCommunityTag').mockReturnValue(communityTag);
      jest.spyOn(communityTagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityTag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityTag }));
      saveSubject.complete();

      // THEN
      expect(communityTagFormService.getCommunityTag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(communityTagService.update).toHaveBeenCalledWith(expect.objectContaining(communityTag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityTag>>();
      const communityTag = { id: 123 };
      jest.spyOn(communityTagFormService, 'getCommunityTag').mockReturnValue({ id: null });
      jest.spyOn(communityTagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityTag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityTag }));
      saveSubject.complete();

      // THEN
      expect(communityTagFormService.getCommunityTag).toHaveBeenCalled();
      expect(communityTagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityTag>>();
      const communityTag = { id: 123 };
      jest.spyOn(communityTagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityTag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(communityTagService.update).toHaveBeenCalled();
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

    describe('compareTag', () => {
      it('Should forward to tagService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tagService, 'compareTag');
        comp.compareTag(entity, entity2);
        expect(tagService.compareTag).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
