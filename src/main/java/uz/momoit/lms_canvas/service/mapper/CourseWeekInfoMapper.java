package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseWeekInfo;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseWeekInfoDTO;

/**
 * Mapper for the entity {@link CourseWeekInfo} and its DTO {@link CourseWeekInfoDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseWeekInfoMapper extends EntityMapper<CourseWeekInfoDTO, CourseWeekInfo> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    CourseWeekInfoDTO toDto(CourseWeekInfo s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
