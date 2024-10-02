package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Attachment;
import uz.momoit.lms_canvas.domain.Message;
import uz.momoit.lms_canvas.domain.MessageAttachment;
import uz.momoit.lms_canvas.service.dto.AttachmentDTO;
import uz.momoit.lms_canvas.service.dto.MessageAttachmentDTO;
import uz.momoit.lms_canvas.service.dto.MessageDTO;

/**
 * Mapper for the entity {@link MessageAttachment} and its DTO {@link MessageAttachmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface MessageAttachmentMapper extends EntityMapper<MessageAttachmentDTO, MessageAttachment> {
    @Mapping(target = "message", source = "message", qualifiedByName = "messageId")
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    MessageAttachmentDTO toDto(MessageAttachment s);

    @Named("messageId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MessageDTO toDtoMessageId(Message message);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);
}
