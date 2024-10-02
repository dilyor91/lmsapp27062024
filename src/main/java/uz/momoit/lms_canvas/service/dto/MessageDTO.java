package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Message} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MessageDTO implements Serializable {

    private Long id;

    private String subject;

    private String body;

    private Boolean toAllCourseStudents;

    private String toSectionIds;

    private Instant senderDate;

    private Boolean deleted;

    private CourseDTO course;

    private UserDTO sender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Boolean getToAllCourseStudents() {
        return toAllCourseStudents;
    }

    public void setToAllCourseStudents(Boolean toAllCourseStudents) {
        this.toAllCourseStudents = toAllCourseStudents;
    }

    public String getToSectionIds() {
        return toSectionIds;
    }

    public void setToSectionIds(String toSectionIds) {
        this.toSectionIds = toSectionIds;
    }

    public Instant getSenderDate() {
        return senderDate;
    }

    public void setSenderDate(Instant senderDate) {
        this.senderDate = senderDate;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MessageDTO)) {
            return false;
        }

        MessageDTO messageDTO = (MessageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, messageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MessageDTO{" +
            "id=" + getId() +
            ", subject='" + getSubject() + "'" +
            ", body='" + getBody() + "'" +
            ", toAllCourseStudents='" + getToAllCourseStudents() + "'" +
            ", toSectionIds='" + getToSectionIds() + "'" +
            ", senderDate='" + getSenderDate() + "'" +
            ", deleted='" + getDeleted() + "'" +
            ", course=" + getCourse() +
            ", sender=" + getSender() +
            "}";
    }
}
