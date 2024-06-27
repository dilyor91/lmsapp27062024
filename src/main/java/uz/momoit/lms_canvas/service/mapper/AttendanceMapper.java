package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Attendance;
import uz.momoit.lms_canvas.domain.Lesson;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.service.dto.AttendanceDTO;
import uz.momoit.lms_canvas.service.dto.LessonDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link Attendance} and its DTO {@link AttendanceDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttendanceMapper extends EntityMapper<AttendanceDTO, Attendance> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonId")
    AttendanceDTO toDto(Attendance s);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("lessonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonDTO toDtoLessonId(Lesson lesson);
}
