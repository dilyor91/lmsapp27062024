package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.CalendarTodo;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.CalendarTodoDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link CalendarTodo} and its DTO {@link CalendarTodoDTO}.
 */
@Mapper(componentModel = "spring")
public interface CalendarTodoMapper extends EntityMapper<CalendarTodoDTO, CalendarTodo> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    CalendarTodoDTO toDto(CalendarTodo s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
