package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.domain.Attachment;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.dto.AttachmentDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;

/**
 * Mapper for the entity {@link Announcement} and its DTO {@link AnnouncementDTO}.
 */
@Mapper(componentModel = "spring")
public interface AnnouncementMapper extends EntityMapper<AnnouncementDTO, Announcement> {
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    AnnouncementDTO toDto(Announcement s);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);
}
