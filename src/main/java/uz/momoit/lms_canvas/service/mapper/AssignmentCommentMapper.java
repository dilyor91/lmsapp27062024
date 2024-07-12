package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Assignment;
import uz.momoit.lms_canvas.domain.AssignmentComment;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.domain.SubmissionAssignment;
import uz.momoit.lms_canvas.domain.Teacher;
import uz.momoit.lms_canvas.service.dto.AssignmentCommentDTO;
import uz.momoit.lms_canvas.service.dto.AssignmentDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;
import uz.momoit.lms_canvas.service.dto.TeacherDTO;

/**
 * Mapper for the entity {@link AssignmentComment} and its DTO {@link AssignmentCommentDTO}.
 */
@Mapper(componentModel = "spring")
public interface AssignmentCommentMapper extends EntityMapper<AssignmentCommentDTO, AssignmentComment> {
    @Mapping(target = "submissionAssignment", source = "submissionAssignment", qualifiedByName = "submissionAssignmentId")
    @Mapping(target = "assignment", source = "assignment", qualifiedByName = "assignmentId")
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "teacher", source = "teacher", qualifiedByName = "teacherId")
    AssignmentCommentDTO toDto(AssignmentComment s);

    @Named("submissionAssignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SubmissionAssignmentDTO toDtoSubmissionAssignmentId(SubmissionAssignment submissionAssignment);

    @Named("assignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssignmentDTO toDtoAssignmentId(Assignment assignment);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("teacherId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TeacherDTO toDtoTeacherId(Teacher teacher);
}
