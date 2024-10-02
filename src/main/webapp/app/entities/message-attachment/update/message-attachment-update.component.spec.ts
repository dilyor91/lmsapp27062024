import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IMessage } from 'app/entities/message/message.model';
import { MessageService } from 'app/entities/message/service/message.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { IMessageAttachment } from '../message-attachment.model';
import { MessageAttachmentService } from '../service/message-attachment.service';
import { MessageAttachmentFormService } from './message-attachment-form.service';

import { MessageAttachmentUpdateComponent } from './message-attachment-update.component';

describe('MessageAttachment Management Update Component', () => {
  let comp: MessageAttachmentUpdateComponent;
  let fixture: ComponentFixture<MessageAttachmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let messageAttachmentFormService: MessageAttachmentFormService;
  let messageAttachmentService: MessageAttachmentService;
  let messageService: MessageService;
  let attachmentService: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MessageAttachmentUpdateComponent],
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
      .overrideTemplate(MessageAttachmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MessageAttachmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    messageAttachmentFormService = TestBed.inject(MessageAttachmentFormService);
    messageAttachmentService = TestBed.inject(MessageAttachmentService);
    messageService = TestBed.inject(MessageService);
    attachmentService = TestBed.inject(AttachmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Message query and add missing value', () => {
      const messageAttachment: IMessageAttachment = { id: 456 };
      const message: IMessage = { id: 25502 };
      messageAttachment.message = message;

      const messageCollection: IMessage[] = [{ id: 2337 }];
      jest.spyOn(messageService, 'query').mockReturnValue(of(new HttpResponse({ body: messageCollection })));
      const additionalMessages = [message];
      const expectedCollection: IMessage[] = [...additionalMessages, ...messageCollection];
      jest.spyOn(messageService, 'addMessageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ messageAttachment });
      comp.ngOnInit();

      expect(messageService.query).toHaveBeenCalled();
      expect(messageService.addMessageToCollectionIfMissing).toHaveBeenCalledWith(
        messageCollection,
        ...additionalMessages.map(expect.objectContaining),
      );
      expect(comp.messagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Attachment query and add missing value', () => {
      const messageAttachment: IMessageAttachment = { id: 456 };
      const attachment: IAttachment = { id: 12991 };
      messageAttachment.attachment = attachment;

      const attachmentCollection: IAttachment[] = [{ id: 18101 }];
      jest.spyOn(attachmentService, 'query').mockReturnValue(of(new HttpResponse({ body: attachmentCollection })));
      const additionalAttachments = [attachment];
      const expectedCollection: IAttachment[] = [...additionalAttachments, ...attachmentCollection];
      jest.spyOn(attachmentService, 'addAttachmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ messageAttachment });
      comp.ngOnInit();

      expect(attachmentService.query).toHaveBeenCalled();
      expect(attachmentService.addAttachmentToCollectionIfMissing).toHaveBeenCalledWith(
        attachmentCollection,
        ...additionalAttachments.map(expect.objectContaining),
      );
      expect(comp.attachmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const messageAttachment: IMessageAttachment = { id: 456 };
      const message: IMessage = { id: 5510 };
      messageAttachment.message = message;
      const attachment: IAttachment = { id: 22202 };
      messageAttachment.attachment = attachment;

      activatedRoute.data = of({ messageAttachment });
      comp.ngOnInit();

      expect(comp.messagesSharedCollection).toContain(message);
      expect(comp.attachmentsSharedCollection).toContain(attachment);
      expect(comp.messageAttachment).toEqual(messageAttachment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageAttachment>>();
      const messageAttachment = { id: 123 };
      jest.spyOn(messageAttachmentFormService, 'getMessageAttachment').mockReturnValue(messageAttachment);
      jest.spyOn(messageAttachmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageAttachment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: messageAttachment }));
      saveSubject.complete();

      // THEN
      expect(messageAttachmentFormService.getMessageAttachment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(messageAttachmentService.update).toHaveBeenCalledWith(expect.objectContaining(messageAttachment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageAttachment>>();
      const messageAttachment = { id: 123 };
      jest.spyOn(messageAttachmentFormService, 'getMessageAttachment').mockReturnValue({ id: null });
      jest.spyOn(messageAttachmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageAttachment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: messageAttachment }));
      saveSubject.complete();

      // THEN
      expect(messageAttachmentFormService.getMessageAttachment).toHaveBeenCalled();
      expect(messageAttachmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessageAttachment>>();
      const messageAttachment = { id: 123 };
      jest.spyOn(messageAttachmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ messageAttachment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(messageAttachmentService.update).toHaveBeenCalled();
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
