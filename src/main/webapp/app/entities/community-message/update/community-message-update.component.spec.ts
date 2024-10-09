import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { ICommunityMessage } from '../community-message.model';
import { CommunityMessageService } from '../service/community-message.service';
import { CommunityMessageFormService } from './community-message-form.service';

import { CommunityMessageUpdateComponent } from './community-message-update.component';

describe('CommunityMessage Management Update Component', () => {
  let comp: CommunityMessageUpdateComponent;
  let fixture: ComponentFixture<CommunityMessageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let communityMessageFormService: CommunityMessageFormService;
  let communityMessageService: CommunityMessageService;
  let communityService: CommunityService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityMessageUpdateComponent],
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
      .overrideTemplate(CommunityMessageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommunityMessageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    communityMessageFormService = TestBed.inject(CommunityMessageFormService);
    communityMessageService = TestBed.inject(CommunityMessageService);
    communityService = TestBed.inject(CommunityService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Community query and add missing value', () => {
      const communityMessage: ICommunityMessage = { id: 456 };
      const community: ICommunity = { id: 4801 };
      communityMessage.community = community;

      const communityCollection: ICommunity[] = [{ id: 3297 }];
      jest.spyOn(communityService, 'query').mockReturnValue(of(new HttpResponse({ body: communityCollection })));
      const additionalCommunities = [community];
      const expectedCollection: ICommunity[] = [...additionalCommunities, ...communityCollection];
      jest.spyOn(communityService, 'addCommunityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityMessage });
      comp.ngOnInit();

      expect(communityService.query).toHaveBeenCalled();
      expect(communityService.addCommunityToCollectionIfMissing).toHaveBeenCalledWith(
        communityCollection,
        ...additionalCommunities.map(expect.objectContaining),
      );
      expect(comp.communitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const communityMessage: ICommunityMessage = { id: 456 };
      const sender: IUser = { id: 1871 };
      communityMessage.sender = sender;

      const userCollection: IUser[] = [{ id: 25666 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [sender];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ communityMessage });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const communityMessage: ICommunityMessage = { id: 456 };
      const community: ICommunity = { id: 21949 };
      communityMessage.community = community;
      const sender: IUser = { id: 12265 };
      communityMessage.sender = sender;

      activatedRoute.data = of({ communityMessage });
      comp.ngOnInit();

      expect(comp.communitiesSharedCollection).toContain(community);
      expect(comp.usersSharedCollection).toContain(sender);
      expect(comp.communityMessage).toEqual(communityMessage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityMessage>>();
      const communityMessage = { id: 123 };
      jest.spyOn(communityMessageFormService, 'getCommunityMessage').mockReturnValue(communityMessage);
      jest.spyOn(communityMessageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityMessage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityMessage }));
      saveSubject.complete();

      // THEN
      expect(communityMessageFormService.getCommunityMessage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(communityMessageService.update).toHaveBeenCalledWith(expect.objectContaining(communityMessage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityMessage>>();
      const communityMessage = { id: 123 };
      jest.spyOn(communityMessageFormService, 'getCommunityMessage').mockReturnValue({ id: null });
      jest.spyOn(communityMessageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityMessage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: communityMessage }));
      saveSubject.complete();

      // THEN
      expect(communityMessageFormService.getCommunityMessage).toHaveBeenCalled();
      expect(communityMessageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunityMessage>>();
      const communityMessage = { id: 123 };
      jest.spyOn(communityMessageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ communityMessage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(communityMessageService.update).toHaveBeenCalled();
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

    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
