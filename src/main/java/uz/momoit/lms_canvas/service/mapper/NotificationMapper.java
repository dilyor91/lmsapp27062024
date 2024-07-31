package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Assignment;
import uz.momoit.lms_canvas.domain.Notification;
import uz.momoit.lms_canvas.domain.Quiz;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.domain.SubmissionAssignment;
import uz.momoit.lms_canvas.domain.Teacher;
import uz.momoit.lms_canvas.service.dto.AssignmentDTO;
import uz.momoit.lms_canvas.service.dto.NotificationDTO;
import uz.momoit.lms_canvas.service.dto.QuizDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;
import uz.momoit.lms_canvas.service.dto.TeacherDTO;

/**
 * Mapper for the entity {@link Notification} and its DTO {@link NotificationDTO}.
 */
@Mapper(componentModel = "spring")
public interface NotificationMapper extends EntityMapper<NotificationDTO, Notification> {
    @Mapping(target = "quiz", source = "quiz", qualifiedByName = "quizId")
    @Mapping(target = "assignment", source = "assignment", qualifiedByName = "assignmentId")
    @Mapping(target = "submissionAssignment", source = "submissionAssignment", qualifiedByName = "submissionAssignmentId")
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "teacher", source = "teacher", qualifiedByName = "teacherId")
    NotificationDTO toDto(Notification s);

    @Named("quizId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizDTO toDtoQuizId(Quiz quiz);

    @Named("assignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssignmentDTO toDtoAssignmentId(Assignment assignment);

    @Named("submissionAssignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SubmissionAssignmentDTO toDtoSubmissionAssignmentId(SubmissionAssignment submissionAssignment);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("teacherId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TeacherDTO toDtoTeacherId(Teacher teacher);
}
