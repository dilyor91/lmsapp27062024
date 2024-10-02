package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.Message;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.MessageDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link Message} and its DTO {@link MessageDTO}.
 */
@Mapper(componentModel = "spring")
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "sender", source = "sender", qualifiedByName = "userId")
    MessageDTO toDto(Message s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
