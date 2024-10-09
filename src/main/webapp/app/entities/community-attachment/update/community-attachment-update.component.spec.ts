import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { ICommunityAttachment } from '../community-attachment.model';
import { CommunityAttachmentService } from '../service/community-attachment.service';
import { CommunityAttachmentFormService } from './community-attachment-form.service';

import { CommunityAttachmentUpdateComponent } from './community-attachment-update.component';

describe('CommunityAttachment Management Update Component', () => {
  let comp: CommunityAttachmentUpdateComponent;
  let fixture: ComponentFixture<CommunityAttachmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let communityAttachmentFormService: CommunityAttachmentFormService;
  let communityAttachmentService: CommunityAttachmentService;
  let communityService: CommunityService;
  let attachmentService: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityAttachmentUpdateComponent],
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
      .overrideTemplate(CommunityAttachmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommunityAttachmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    communityAttachmentFormService = TestBed.inject(CommunityAttachmentFormService);
    communityAttachmentService = TestBed.inject(CommunityAttachmentService);
    communityService = TestBed.inject(CommunityService);
    attachmentService = TestBed.inject(AttachmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Community query and add missing value', () => {
      const communityAttachment: ICommunityAttachment = { id: 456 };
      const community: ICommunity = { id: 31979 };
      communityAttachment.community = community;

      const communityCollection: ICommunity[] = [{ id: 30290 }];
      jest.spyOn(communityService, 'query').mockReturnValue(of(new HttpResponse({ body: communityCollection })));
      const additionalCommunities = [community];
      const expectedCollection: ICommunity[] = [...additionalCommunities, ...communityCollection];
      jest.spyOn(communityService, 'addCommunityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityAttachment });
      comp.ngOnInit();

      expect(communityService.query).toHaveBeenCalled();
      expect(communityService.addCommunityToCollectionIfMissing).toHaveBeenCalledWith(
        communityCollection,
        ...additionalCommunities.map(expect.objectContaining),
      );
      expect(comp.communitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Attachment query and add missing value', () => {
      const communityAttachment: ICommunityAttachment = { id: 456 };
      const attachment: IAttachment = { id: 583 };
      communityAttachment.attachment = attachment;

      const attachmentCollection: IAttachment[] = [{ id: 435 }];
      jest.spyOn(attachmentService, 'query').mockReturnValue(of(new HttpResponse({ body: attachmentCollection })));
      const additionalAttachments = [attachment];
      const expectedCollection: IAttachment[] = [...additionalAttachments, ...attachmentCollection];
      jest.spyOn(attachmentService, 'addAttachmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityAttachment });
      comp.ngOnInit();

      expect(attachmentService.query).toHaveBeenCalled();
      expect(attachmentService.addAttachmentToCollectionIfMissing).toHaveBeenCalledWith(
        attachmentCollection,
        ...additionalAttachments.map(expect.objectContaining),
      );
      expect(comp.attachmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const communityAttachment: ICommunityAttachment = { id: 456 };
      const community: ICommunity = { id: 21951 };
      communityAttachment.community = community;
      const attachment: IAttachment = { id: 31869 };
      communityAttachment.attachment = attachment;

      activatedRoute.data = of({ communityAttachment });
      comp.ngOnInit();

      expect(comp.communitiesSharedCollection).toContain(community);
      expect(comp.attachmentsSharedCollection).toContain(attachment);
      expect(comp.communityAttachment).toEqual(communityAttachment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityAttachment>>();
      const communityAttachment = { id: 123 };
      jest.spyOn(communityAttachmentFormService, 'getCommunityAttachment').mockReturnValue(communityAttachment);
      jest.spyOn(communityAttachmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityAttachment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityAttachment }));
      saveSubject.complete();

      // THEN
      expect(communityAttachmentFormService.getCommunityAttachment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(communityAttachmentService.update).toHaveBeenCalledWith(expect.objectContaining(communityAttachment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityAttachment>>();
      const communityAttachment = { id: 123 };
      jest.spyOn(communityAttachmentFormService, 'getCommunityAttachment').mockReturnValue({ id: null });
      jest.spyOn(communityAttachmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityAttachment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityAttachment }));
      saveSubject.complete();

      // THEN
      expect(communityAttachmentFormService.getCommunityAttachment).toHaveBeenCalled();
      expect(communityAttachmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityAttachment>>();
      const communityAttachment = { id: 123 };
      jest.spyOn(communityAttachmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityAttachment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(communityAttachmentService.update).toHaveBeenCalled();
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

    describe('compareAttachment', () => {
      it('Should forward to attachmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(attachmentService, 'compareAttachment');
        comp.compareAttachment(entity, entity2);
        expect(attachmentService.compareAttachment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
