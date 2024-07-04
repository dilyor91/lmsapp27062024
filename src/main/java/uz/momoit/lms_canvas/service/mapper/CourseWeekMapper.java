package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseWeek;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseWeekDTO;

/**
 * Mapper for the entity {@link CourseWeek} and its DTO {@link CourseWeekDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseWeekMapper extends EntityMapper<CourseWeekDTO, CourseWeek> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    CourseWeekDTO toDto(CourseWeek s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
