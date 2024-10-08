import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { CommunityService } from '../service/community.service';
import { ICommunity } from '../community.model';
import { CommunityFormService } from './community-form.service';

import { CommunityUpdateComponent } from './community-update.component';

describe('Community Management Update Component', () => {
  let comp: CommunityUpdateComponent;
  let fixture: ComponentFixture<CommunityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let communityFormService: CommunityFormService;
  let communityService: CommunityService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityUpdateComponent],
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
      .overrideTemplate(CommunityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommunityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    communityFormService = TestBed.inject(CommunityFormService);
    communityService = TestBed.inject(CommunityService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const community: ICommunity = { id: 456 };
      const user: IUser = { id: 15399 };
      community.user = user;

      const userCollection: IUser[] = [{ id: 17470 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ community });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const community: ICommunity = { id: 456 };
      const user: IUser = { id: 21532 };
      community.user = user;

      activatedRoute.data = of({ community });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.community).toEqual(community);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunity>>();
      const community = { id: 123 };
      jest.spyOn(communityFormService, 'getCommunity').mockReturnValue(community);
      jest.spyOn(communityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ community });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: community }));
      saveSubject.complete();

      // THEN
      expect(communityFormService.getCommunity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(communityService.update).toHaveBeenCalledWith(expect.objectContaining(community));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunity>>();
      const community = { id: 123 };
      jest.spyOn(communityFormService, 'getCommunity').mockReturnValue({ id: null });
      jest.spyOn(communityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ community: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: community }));
      saveSubject.complete();

      // THEN
      expect(communityFormService.getCommunity).toHaveBeenCalled();
      expect(communityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommunity>>();
      const community = { id: 123 };
      jest.spyOn(communityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ community });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(communityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
