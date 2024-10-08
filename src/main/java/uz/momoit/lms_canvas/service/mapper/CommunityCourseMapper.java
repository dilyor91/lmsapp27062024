package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Community;
import uz.momoit.lms_canvas.domain.CommunityCourse;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.service.dto.CommunityCourseDTO;
import uz.momoit.lms_canvas.service.dto.CommunityDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;

/**
 * Mapper for the entity {@link CommunityCourse} and its DTO {@link CommunityCourseDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommunityCourseMapper extends EntityMapper<CommunityCourseDTO, CommunityCourse> {
    @Mapping(target = "community", source = "community", qualifiedByName = "communityId")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    CommunityCourseDTO toDto(CommunityCourse s);

    @Named("communityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommunityDTO toDtoCommunityId(Community community);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
