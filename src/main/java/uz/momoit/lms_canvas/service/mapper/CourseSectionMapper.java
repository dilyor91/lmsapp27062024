package uz.momoit.lms_canvas.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.domain.Assignment;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseSection;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.dto.AssignmentDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseSectionDTO;

/**
 * Mapper for the entity {@link CourseSection} and its DTO {@link CourseSectionDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseSectionMapper extends EntityMapper<CourseSectionDTO, CourseSection> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "announcements", source = "announcements", qualifiedByName = "announcementIdSet")
    @Mapping(target = "assignments", source = "assignments", qualifiedByName = "assignmentIdSet")
    CourseSectionDTO toDto(CourseSection s);

    @Mapping(target = "announcements", ignore = true)
    @Mapping(target = "removeAnnouncement", ignore = true)
    @Mapping(target = "assignments", ignore = true)
    @Mapping(target = "removeAssignment", ignore = true)
    CourseSection toEntity(CourseSectionDTO courseSectionDTO);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("announcementId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AnnouncementDTO toDtoAnnouncementId(Announcement announcement);

    @Named("announcementIdSet")
    default Set<AnnouncementDTO> toDtoAnnouncementIdSet(Set<Announcement> announcement) {
        return announcement.stream().map(this::toDtoAnnouncementId).collect(Collectors.toSet());
    }

    @Named("assignmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssignmentDTO toDtoAssignmentId(Assignment assignment);

    @Named("assignmentIdSet")
    default Set<AssignmentDTO> toDtoAssignmentIdSet(Set<Assignment> assignment) {
        return assignment.stream().map(this::toDtoAssignmentId).collect(Collectors.toSet());
    }
}
