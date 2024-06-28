package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.StudyTerm} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudyTermDTO implements Serializable {

    private Long id;

    @NotNull
    private String termName;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    @NotNull
    private Boolean status;

    private StudyAcademicYearDTO studyAcademicYear;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public StudyAcademicYearDTO getStudyAcademicYear() {
        return studyAcademicYear;
    }

    public void setStudyAcademicYear(StudyAcademicYearDTO studyAcademicYear) {
        this.studyAcademicYear = studyAcademicYear;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudyTermDTO)) {
            return false;
        }

        StudyTermDTO studyTermDTO = (StudyTermDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studyTermDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudyTermDTO{" +
            "id=" + getId() +
            ", termName='" + getTermName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", studyAcademicYear=" + getStudyAcademicYear() +
            "}";
    }
}
