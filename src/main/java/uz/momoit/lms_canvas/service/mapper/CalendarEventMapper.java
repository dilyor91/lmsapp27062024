package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.CalendarEvent;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.CalendarEventDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link CalendarEvent} and its DTO {@link CalendarEventDTO}.
 */
@Mapper(componentModel = "spring")
public interface CalendarEventMapper extends EntityMapper<CalendarEventDTO, CalendarEvent> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    CalendarEventDTO toDto(CalendarEvent s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
