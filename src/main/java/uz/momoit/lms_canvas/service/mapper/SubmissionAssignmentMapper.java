package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Assignment;
import uz.momoit.lms_canvas.domain.Attachment;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.domain.SubmissionAssignment;
import uz.momoit.lms_canvas.service.dto.AssignmentDTO;
import uz.momoit.lms_canvas.service.dto.AttachmentDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;

/**
 * Mapper for the entity {@link SubmissionAssignment} and its DTO {@link SubmissionAssignmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface SubmissionAssignmentMapper extends EntityMapper<SubmissionAssignmentDTO, SubmissionAssignment> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "assignment", source = "assignment", qualifiedByName = "assignmentId")
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    SubmissionAssignmentDTO toDto(SubmissionAssignment s);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("assignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssignmentDTO toDtoAssignmentId(Assignment assignment);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);
}
