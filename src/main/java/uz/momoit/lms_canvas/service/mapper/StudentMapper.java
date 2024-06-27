package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Faculty;
import uz.momoit.lms_canvas.domain.Group;
import uz.momoit.lms_canvas.domain.Speciality;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.domain.StudyAcademicYear;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.FacultyDTO;
import uz.momoit.lms_canvas.service.dto.GroupDTO;
import uz.momoit.lms_canvas.service.dto.SpecialityDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link Student} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {
    @Mapping(target = "studyAcademicYear", source = "studyAcademicYear", qualifiedByName = "studyAcademicYearId")
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    @Mapping(target = "faculty", source = "faculty", qualifiedByName = "facultyId")
    @Mapping(target = "speciality", source = "speciality", qualifiedByName = "specialityId")
    @Mapping(target = "group", source = "group", qualifiedByName = "groupId")
    StudentDTO toDto(Student s);

    @Named("studyAcademicYearId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudyAcademicYearDTO toDtoStudyAcademicYearId(StudyAcademicYear studyAcademicYear);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);

    @Named("facultyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FacultyDTO toDtoFacultyId(Faculty faculty);

    @Named("specialityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SpecialityDTO toDtoSpecialityId(Speciality speciality);

    @Named("groupId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GroupDTO toDtoGroupId(Group group);
}
