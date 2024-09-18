package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.AnnouncementStudentRead} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnnouncementStudentReadDTO implements Serializable {

    private Long id;

    private Boolean read;

    private Instant readAt;

    private AnnouncementDTO announcement;

    private StudentDTO student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Instant getReadAt() {
        return readAt;
    }

    public void setReadAt(Instant readAt) {
        this.readAt = readAt;
    }

    public AnnouncementDTO getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(AnnouncementDTO announcement) {
        this.announcement = announcement;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnnouncementStudentReadDTO)) {
            return false;
        }

        AnnouncementStudentReadDTO announcementStudentReadDTO = (AnnouncementStudentReadDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, announcementStudentReadDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnnouncementStudentReadDTO{" +
            "id=" + getId() +
            ", read='" + getRead() + "'" +
            ", readAt='" + getReadAt() + "'" +
            ", announcement=" + getAnnouncement() +
            ", student=" + getStudent() +
            "}";
    }
}
