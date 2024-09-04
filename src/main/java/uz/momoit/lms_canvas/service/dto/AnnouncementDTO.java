package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Announcement} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnnouncementDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String content;

    private Instant availableFromDate;

    private Instant availableUntilDate;

    private Boolean published;

    private AttachmentDTO attachment;

    private CourseDTO course;

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getAvailableFromDate() {
        return availableFromDate;
    }

    public void setAvailableFromDate(Instant availableFromDate) {
        this.availableFromDate = availableFromDate;
    }

    public Instant getAvailableUntilDate() {
        return availableUntilDate;
    }

    public void setAvailableUntilDate(Instant availableUntilDate) {
        this.availableUntilDate = availableUntilDate;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnnouncementDTO)) {
            return false;
        }

        AnnouncementDTO announcementDTO = (AnnouncementDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, announcementDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnnouncementDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", availableFromDate='" + getAvailableFromDate() + "'" +
            ", availableUntilDate='" + getAvailableUntilDate() + "'" +
            ", published='" + getPublished() + "'" +
            ", attachment=" + getAttachment() +
            ", course=" + getCourse() +
            "}";
    }
}
