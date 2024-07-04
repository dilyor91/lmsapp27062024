package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Attachment;
import uz.momoit.lms_canvas.domain.Lesson;
import uz.momoit.lms_canvas.domain.LessonMaterial;
import uz.momoit.lms_canvas.service.dto.AttachmentDTO;
import uz.momoit.lms_canvas.service.dto.LessonDTO;
import uz.momoit.lms_canvas.service.dto.LessonMaterialDTO;

/**
 * Mapper for the entity {@link LessonMaterial} and its DTO {@link LessonMaterialDTO}.
 */
@Mapper(componentModel = "spring")
public interface LessonMaterialMapper extends EntityMapper<LessonMaterialDTO, LessonMaterial> {
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonId")
    LessonMaterialDTO toDto(LessonMaterial s);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);

    @Named("lessonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonDTO toDtoLessonId(Lesson lesson);
}
