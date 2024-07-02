package uz.momoit.lms_canvas.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseSection;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseSectionDTO;

/**
 * Mapper for the entity {@link CourseSection} and its DTO {@link CourseSectionDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseSectionMapper extends EntityMapper<CourseSectionDTO, CourseSection> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "announcements", source = "announcements", qualifiedByName = "announcementIdSet")
    CourseSectionDTO toDto(CourseSection s);

    @Mapping(target = "announcements", ignore = true)
    @Mapping(target = "removeAnnouncement", ignore = true)
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
}
