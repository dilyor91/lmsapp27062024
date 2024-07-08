package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.SubmissionAssignment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SubmissionAssignmentDTO implements Serializable {

    private Long id;

    private Instant submissionDate;

    private String content;

    private String comment;

    private Integer attempsNumber;

    private StudentDTO student;

    private CourseDTO course;

    private AssignmentDTO assignment;

    private AttachmentDTO attachment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Instant submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getAttempsNumber() {
        return attempsNumber;
    }

    public void setAttempsNumber(Integer attempsNumber) {
        this.attempsNumber = attempsNumber;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public AssignmentDTO getAssignment() {
        return assignment;
    }

    public void setAssignment(AssignmentDTO assignment) {
        this.assignment = assignment;
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubmissionAssignmentDTO)) {
            return false;
        }

        SubmissionAssignmentDTO submissionAssignmentDTO = (SubmissionAssignmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, submissionAssignmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubmissionAssignmentDTO{" +
            "id=" + getId() +
            ", submissionDate='" + getSubmissionDate() + "'" +
            ", content='" + getContent() + "'" +
            ", comment='" + getComment() + "'" +
            ", attempsNumber=" + getAttempsNumber() +
            ", student=" + getStudent() +
            ", course=" + getCourse() +
            ", assignment=" + getAssignment() +
            ", attachment=" + getAttachment() +
            "}";
    }
}
