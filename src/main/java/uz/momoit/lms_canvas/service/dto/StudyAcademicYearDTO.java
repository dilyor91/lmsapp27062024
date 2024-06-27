package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.StudyAcademicYear} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudyAcademicYearDTO implements Serializable {

    private Long id;

    private Instant fromDate;

    private Instant endDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFromDate() {
        return fromDate;
    }

    public void setFromDate(Instant fromDate) {
        this.fromDate = fromDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudyAcademicYearDTO)) {
            return false;
        }

        StudyAcademicYearDTO studyAcademicYearDTO = (StudyAcademicYearDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studyAcademicYearDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudyAcademicYearDTO{" +
            "id=" + getId() +
            ", fromDate='" + getFromDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
