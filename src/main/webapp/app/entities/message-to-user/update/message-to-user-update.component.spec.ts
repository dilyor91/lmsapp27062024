import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IMessage } from 'app/entities/message/message.model';
import { MessageService } from 'app/entities/message/service/message.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IMessageToUser } from '../message-to-user.model';
import { MessageToUserService } from '../service/message-to-user.service';
import { MessageToUserFormService } from './message-to-user-form.service';

import { MessageToUserUpdateComponent } from './message-to-user-update.component';

describe('MessageToUser Management Update Component', () => {
  let comp: MessageToUserUpdateComponent;
  let fixture: ComponentFixture<MessageToUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let messageToUserFormService: MessageToUserFormService;
  let messageToUserService: MessageToUserService;
  let messageService: MessageService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MessageToUserUpdateComponent],
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
      .overrideTemplate(MessageToUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MessageToUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    messageToUserFormService = TestBed.inject(MessageToUserFormService);
    messageToUserService = TestBed.inject(MessageToUserService);
    messageService = TestBed.inject(MessageService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Message query and add missing value', () => {
      const messageToUser: IMessageToUser = { id: 456 };
      const message: IMessage = { id: 11612 };
      messageToUser.message = message;

      const messageCollection: IMessage[] = [{ id: 2227 }];
      jest.spyOn(messageService, 'query').mockReturnValue(of(new HttpResponse({ body: messageCollection })));
      const additionalMessages = [message];
      const expectedCollection: IMessage[] = [...additionalMessages, ...messageCollection];
      jest.spyOn(messageService, 'addMessageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ messageToUser });
      comp.ngOnInit();

      expect(messageService.query).toHaveBeenCalled();
      expect(messageService.addMessageToCollectionIfMissing).toHaveBeenCalledWith(
        messageCollection,
        ...additionalMessages.map(expect.objectContaining),
      );
      expect(comp.messagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const messageToUser: IMessageToUser = { id: 456 };
      const receiver: IUser = { id: 31150 };
      messageToUser.receiver = receiver;

      const userCollection: IUser[] = [{ id: 1268 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [receiver];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ messageToUser });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const messageToUser: IMessageToUser = { id: 456 };
      const message: IMessage = { id: 940 };
      messageToUser.message = message;
      const receiver: IUser = { id: 11938 };
      messageToUser.receiver = receiver;

      activatedRoute.data = of({ messageToUser });
      comp.ngOnInit();

      expect(comp.messagesSharedCollection).toContain(message);
      expect(comp.usersSharedCollection).toContain(receiver);
      expect(comp.messageToUser).toEqual(messageToUser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageToUser>>();
      const messageToUser = { id: 123 };
      jest.spyOn(messageToUserFormService, 'getMessageToUser').mockReturnValue(messageToUser);
      jest.spyOn(messageToUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageToUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: messageToUser }));
      saveSubject.complete();

      // THEN
      expect(messageToUserFormService.getMessageToUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(messageToUserService.update).toHaveBeenCalledWith(expect.objectContaining(messageToUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageToUser>>();
      const messageToUser = { id: 123 };
      jest.spyOn(messageToUserFormService, 'getMessageToUser').mockReturnValue({ id: null });
      jest.spyOn(messageToUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageToUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: messageToUser }));
      saveSubject.complete();

      // THEN
      expect(messageToUserFormService.getMessageToUser).toHaveBeenCalled();
      expect(messageToUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageToUser>>();
      const messageToUser = { id: 123 };
      jest.spyOn(messageToUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageToUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(messageToUserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMessage', () => {
      it('Should forward to messageService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(messageService, 'compareMessage');
        comp.compareMessage(entity, entity2);
        expect(messageService.compareMessage).toHaveBeenCalledWith(entity, entity2);
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
