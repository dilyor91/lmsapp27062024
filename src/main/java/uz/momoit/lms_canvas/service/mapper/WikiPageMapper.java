package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.WikiPage;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.WikiPageDTO;

/**
 * Mapper for the entity {@link WikiPage} and its DTO {@link WikiPageDTO}.
 */
@Mapper(componentModel = "spring")
public interface WikiPageMapper extends EntityMapper<WikiPageDTO, WikiPage> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    WikiPageDTO toDto(WikiPage s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
