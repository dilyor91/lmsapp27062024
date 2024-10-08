package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Attachment;
import uz.momoit.lms_canvas.domain.Community;
import uz.momoit.lms_canvas.domain.CommunityAttachment;
import uz.momoit.lms_canvas.service.dto.AttachmentDTO;
import uz.momoit.lms_canvas.service.dto.CommunityAttachmentDTO;
import uz.momoit.lms_canvas.service.dto.CommunityDTO;

/**
 * Mapper for the entity {@link CommunityAttachment} and its DTO {@link CommunityAttachmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommunityAttachmentMapper extends EntityMapper<CommunityAttachmentDTO, CommunityAttachment> {
    @Mapping(target = "community", source = "community", qualifiedByName = "communityId")
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    CommunityAttachmentDTO toDto(CommunityAttachment s);

    @Named("communityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommunityDTO toDtoCommunityId(Community community);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);
}
