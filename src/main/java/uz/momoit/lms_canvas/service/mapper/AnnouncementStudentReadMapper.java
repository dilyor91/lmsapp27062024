package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.domain.AnnouncementStudentRead;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.dto.AnnouncementStudentReadDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link AnnouncementStudentRead} and its DTO {@link AnnouncementStudentReadDTO}.
 */
@Mapper(componentModel = "spring")
public interface AnnouncementStudentReadMapper extends EntityMapper<AnnouncementStudentReadDTO, AnnouncementStudentRead> {
    @Mapping(target = "announcement", source = "announcement", qualifiedByName = "announcementId")
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    AnnouncementStudentReadDTO toDto(AnnouncementStudentRead s);

    @Named("announcementId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AnnouncementDTO toDtoAnnouncementId(Announcement announcement);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);
}
