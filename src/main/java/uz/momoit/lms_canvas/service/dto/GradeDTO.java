package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Grade} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GradeDTO implements Serializable {

    private Long id;

    private Integer point;

    private Instant gradedDate;

    private SubmissionAssignmentDTO submissionAssignment;

    private TeacherDTO teacher;

    private AssignmentDTO assignment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Instant getGradedDate() {
        return gradedDate;
    }

    public void setGradedDate(Instant gradedDate) {
        this.gradedDate = gradedDate;
    }

    public SubmissionAssignmentDTO getSubmissionAssignment() {
        return submissionAssignment;
    }

    public void setSubmissionAssignment(SubmissionAssignmentDTO submissionAssignment) {
        this.submissionAssignment = submissionAssignment;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    public AssignmentDTO getAssignment() {
        return assignment;
    }

    public void setAssignment(AssignmentDTO assignment) {
        this.assignment = assignment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GradeDTO)) {
            return false;
        }

        GradeDTO gradeDTO = (GradeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, gradeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GradeDTO{" +
            "id=" + getId() +
            ", point=" + getPoint() +
            ", gradedDate='" + getGradedDate() + "'" +
            ", submissionAssignment=" + getSubmissionAssignment() +
            ", teacher=" + getTeacher() +
            ", assignment=" + getAssignment() +
            "}";
    }
}
