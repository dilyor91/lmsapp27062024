package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.Exam;
import uz.momoit.lms_canvas.domain.ExamResult;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.ExamDTO;
import uz.momoit.lms_canvas.service.dto.ExamResultDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link ExamResult} and its DTO {@link ExamResultDTO}.
 */
@Mapper(componentModel = "spring")
public interface ExamResultMapper extends EntityMapper<ExamResultDTO, ExamResult> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "exam", source = "exam", qualifiedByName = "examId")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    ExamResultDTO toDto(ExamResult s);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("examId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ExamDTO toDtoExamId(Exam exam);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
