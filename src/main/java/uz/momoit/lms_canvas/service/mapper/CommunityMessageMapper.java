package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Community;
import uz.momoit.lms_canvas.domain.CommunityMessage;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.CommunityDTO;
import uz.momoit.lms_canvas.service.dto.CommunityMessageDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link CommunityMessage} and its DTO {@link CommunityMessageDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommunityMessageMapper extends EntityMapper<CommunityMessageDTO, CommunityMessage> {
    @Mapping(target = "community", source = "community", qualifiedByName = "communityId")
    @Mapping(target = "sender", source = "sender", qualifiedByName = "userId")
    CommunityMessageDTO toDto(CommunityMessage s);

    @Named("communityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommunityDTO toDtoCommunityId(Community community);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
