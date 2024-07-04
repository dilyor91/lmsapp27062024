package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.LessonFileTypeEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.LessonMaterial} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LessonMaterialDTO implements Serializable {

    private Long id;

    private String title;

    private String description;

    private LessonFileTypeEnum lessonFileType;

    private AttachmentDTO attachment;

    private LessonDTO lesson;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LessonFileTypeEnum getLessonFileType() {
        return lessonFileType;
    }

    public void setLessonFileType(LessonFileTypeEnum lessonFileType) {
        this.lessonFileType = lessonFileType;
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    public LessonDTO getLesson() {
        return lesson;
    }

    public void setLesson(LessonDTO lesson) {
        this.lesson = lesson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LessonMaterialDTO)) {
            return false;
        }

        LessonMaterialDTO lessonMaterialDTO = (LessonMaterialDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, lessonMaterialDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LessonMaterialDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", lessonFileType='" + getLessonFileType() + "'" +
            ", attachment=" + getAttachment() +
            ", lesson=" + getLesson() +
            "}";
    }
}
