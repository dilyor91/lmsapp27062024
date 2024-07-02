package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
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

    private Boolean published;

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

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
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
            ", published='" + getPublished() + "'" +
            "}";
    }
}
