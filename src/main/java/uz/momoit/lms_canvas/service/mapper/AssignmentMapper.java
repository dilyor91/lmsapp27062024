package uz.momoit.lms_canvas.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Assignment;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseSection;
import uz.momoit.lms_canvas.service.dto.AssignmentDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseSectionDTO;

/**
 * Mapper for the entity {@link Assignment} and its DTO {@link AssignmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface AssignmentMapper extends EntityMapper<AssignmentDTO, Assignment> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "courseSections", source = "courseSections", qualifiedByName = "courseSectionIdSet")
    AssignmentDTO toDto(Assignment s);

    @Mapping(target = "removeCourseSection", ignore = true)
    Assignment toEntity(AssignmentDTO assignmentDTO);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("courseSectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseSectionDTO toDtoCourseSectionId(CourseSection courseSection);

    @Named("courseSectionIdSet")
    default Set<CourseSectionDTO> toDtoCourseSectionIdSet(Set<CourseSection> courseSection) {
        return courseSection.stream().map(this::toDtoCourseSectionId).collect(Collectors.toSet());
    }
}
