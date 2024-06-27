package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Department;
import uz.momoit.lms_canvas.domain.Faculty;
import uz.momoit.lms_canvas.domain.Teacher;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.DepartmentDTO;
import uz.momoit.lms_canvas.service.dto.FacultyDTO;
import uz.momoit.lms_canvas.service.dto.TeacherDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link Teacher} and its DTO {@link TeacherDTO}.
 */
@Mapper(componentModel = "spring")
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    @Mapping(target = "faculty", source = "faculty", qualifiedByName = "facultyId")
    @Mapping(target = "department", source = "department", qualifiedByName = "departmentId")
    TeacherDTO toDto(Teacher s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);

    @Named("facultyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FacultyDTO toDtoFacultyId(Faculty faculty);

    @Named("departmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentDTO toDtoDepartmentId(Department department);
}
