package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.AssignmentComment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AssignmentCommentDTO implements Serializable {

    private Long id;

    @NotNull
    private String comment;

    @NotNull
    private Instant commentDate;

    private SubmissionAssignmentDTO submissionAssignment;

    private AssignmentDTO assignment;

    private StudentDTO student;

    private TeacherDTO teacher;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Instant getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Instant commentDate) {
        this.commentDate = commentDate;
    }

    public SubmissionAssignmentDTO getSubmissionAssignment() {
        return submissionAssignment;
    }

    public void setSubmissionAssignment(SubmissionAssignmentDTO submissionAssignment) {
        this.submissionAssignment = submissionAssignment;
    }

    public AssignmentDTO getAssignment() {
        return assignment;
    }

    public void setAssignment(AssignmentDTO assignment) {
        this.assignment = assignment;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AssignmentCommentDTO)) {
            return false;
        }

        AssignmentCommentDTO assignmentCommentDTO = (AssignmentCommentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, assignmentCommentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AssignmentCommentDTO{" +
            "id=" + getId() +
            ", comment='" + getComment() + "'" +
            ", commentDate='" + getCommentDate() + "'" +
            ", submissionAssignment=" + getSubmissionAssignment() +
            ", assignment=" + getAssignment() +
            ", student=" + getStudent() +
            ", teacher=" + getTeacher() +
            "}";
    }
}
