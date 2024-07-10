package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Assignment;
import uz.momoit.lms_canvas.domain.Grade;
import uz.momoit.lms_canvas.domain.SubmissionAssignment;
import uz.momoit.lms_canvas.domain.Teacher;
import uz.momoit.lms_canvas.service.dto.AssignmentDTO;
import uz.momoit.lms_canvas.service.dto.GradeDTO;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;
import uz.momoit.lms_canvas.service.dto.TeacherDTO;

/**
 * Mapper for the entity {@link Grade} and its DTO {@link GradeDTO}.
 */
@Mapper(componentModel = "spring")
public interface GradeMapper extends EntityMapper<GradeDTO, Grade> {
    @Mapping(target = "submissionAssignment", source = "submissionAssignment", qualifiedByName = "submissionAssignmentId")
    @Mapping(target = "teacher", source = "teacher", qualifiedByName = "teacherId")
    @Mapping(target = "assignment", source = "assignment", qualifiedByName = "assignmentId")
    GradeDTO toDto(Grade s);

    @Named("submissionAssignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SubmissionAssignmentDTO toDtoSubmissionAssignmentId(SubmissionAssignment submissionAssignment);

    @Named("teacherId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TeacherDTO toDtoTeacherId(Teacher teacher);

    @Named("assignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssignmentDTO toDtoAssignmentId(Assignment assignment);
}
