package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseWeek;
import uz.momoit.lms_canvas.domain.Lesson;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseWeekDTO;
import uz.momoit.lms_canvas.service.dto.LessonDTO;

/**
 * Mapper for the entity {@link Lesson} and its DTO {@link LessonDTO}.
 */
@Mapper(componentModel = "spring")
public interface LessonMapper extends EntityMapper<LessonDTO, Lesson> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "courseWeek", source = "courseWeek", qualifiedByName = "courseWeekId")
    LessonDTO toDto(Lesson s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("courseWeekId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseWeekDTO toDtoCourseWeekId(CourseWeek courseWeek);
}
