package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseSection;
import uz.momoit.lms_canvas.domain.Enrollment;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseSectionDTO;
import uz.momoit.lms_canvas.service.dto.EnrollmentDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link Enrollment} and its DTO {@link EnrollmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface EnrollmentMapper extends EntityMapper<EnrollmentDTO, Enrollment> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "courseSection", source = "courseSection", qualifiedByName = "courseSectionId")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    EnrollmentDTO toDto(Enrollment s);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("courseSectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseSectionDTO toDtoCourseSectionId(CourseSection courseSection);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
