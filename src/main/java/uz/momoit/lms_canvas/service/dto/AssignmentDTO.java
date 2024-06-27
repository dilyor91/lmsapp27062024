package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import uz.momoit.lms_canvas.domain.enumeration.SubmissionTypeEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Assignment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AssignmentDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String content;

    private Float points;

    private SubmissionTypeEnum submissionType;

    private Integer allowedAttempts;

    private Instant startDate;

    private Instant endDate;

    private Instant dueDate;

    private Boolean published;

    private CourseDTO course;

    private Set<CourseSectionDTO> courseSections = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Float getPoints() {
        return points;
    }

    public void setPoints(Float points) {
        this.points = points;
    }

    public SubmissionTypeEnum getSubmissionType() {
        return submissionType;
    }

    public void setSubmissionType(SubmissionTypeEnum submissionType) {
        this.submissionType = submissionType;
    }

    public Integer getAllowedAttempts() {
        return allowedAttempts;
    }

    public void setAllowedAttempts(Integer allowedAttempts) {
        this.allowedAttempts = allowedAttempts;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public Set<CourseSectionDTO> getCourseSections() {
        return courseSections;
    }

    public void setCourseSections(Set<CourseSectionDTO> courseSections) {
        this.courseSections = courseSections;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AssignmentDTO)) {
            return false;
        }

        AssignmentDTO assignmentDTO = (AssignmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, assignmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AssignmentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", points=" + getPoints() +
            ", submissionType='" + getSubmissionType() + "'" +
            ", allowedAttempts=" + getAllowedAttempts() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", published='" + getPublished() + "'" +
            ", course=" + getCourse() +
            ", courseSections=" + getCourseSections() +
            "}";
    }
}
