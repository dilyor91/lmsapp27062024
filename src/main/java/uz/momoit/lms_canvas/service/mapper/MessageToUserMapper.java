package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Message;
import uz.momoit.lms_canvas.domain.MessageToUser;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.MessageDTO;
import uz.momoit.lms_canvas.service.dto.MessageToUserDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link MessageToUser} and its DTO {@link MessageToUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface MessageToUserMapper extends EntityMapper<MessageToUserDTO, MessageToUser> {
    @Mapping(target = "message", source = "message", qualifiedByName = "messageId")
    @Mapping(target = "receiver", source = "receiver", qualifiedByName = "userId")
    MessageToUserDTO toDto(MessageToUser s);

    @Named("messageId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MessageDTO toDtoMessageId(Message message);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
