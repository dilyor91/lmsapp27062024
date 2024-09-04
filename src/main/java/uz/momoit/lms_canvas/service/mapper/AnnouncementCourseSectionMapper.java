package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.domain.AnnouncementCourseSection;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.CourseSection;
import uz.momoit.lms_canvas.service.dto.AnnouncementCourseSectionDTO;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.CourseSectionDTO;

/**
 * Mapper for the entity {@link AnnouncementCourseSection} and its DTO {@link AnnouncementCourseSectionDTO}.
 */
@Mapper(componentModel = "spring")
public interface AnnouncementCourseSectionMapper extends EntityMapper<AnnouncementCourseSectionDTO, AnnouncementCourseSection> {
    @Mapping(target = "announcement", source = "announcement", qualifiedByName = "announcementId")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "courseSection", source = "courseSection", qualifiedByName = "courseSectionId")
    AnnouncementCourseSectionDTO toDto(AnnouncementCourseSection s);

    @Named("announcementId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AnnouncementDTO toDtoAnnouncementId(Announcement announcement);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("courseSectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseSectionDTO toDtoCourseSectionId(CourseSection courseSection);
}
