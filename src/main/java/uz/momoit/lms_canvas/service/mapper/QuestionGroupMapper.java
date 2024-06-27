package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.QuestionGroup;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;

/**
 * Mapper for the entity {@link QuestionGroup} and its DTO {@link QuestionGroupDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuestionGroupMapper extends EntityMapper<QuestionGroupDTO, QuestionGroup> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    QuestionGroupDTO toDto(QuestionGroup s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
