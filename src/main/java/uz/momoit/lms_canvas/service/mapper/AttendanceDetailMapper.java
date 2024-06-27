package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Attendance;
import uz.momoit.lms_canvas.domain.AttendanceDetail;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.AttendanceDTO;
import uz.momoit.lms_canvas.service.dto.AttendanceDetailDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link AttendanceDetail} and its DTO {@link AttendanceDetailDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttendanceDetailMapper extends EntityMapper<AttendanceDetailDTO, AttendanceDetail> {
    @Mapping(target = "attendance", source = "attendance", qualifiedByName = "attendanceId")
    @Mapping(target = "student", source = "student", qualifiedByName = "userId")
    AttendanceDetailDTO toDto(AttendanceDetail s);

    @Named("attendanceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttendanceDTO toDtoAttendanceId(Attendance attendance);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
