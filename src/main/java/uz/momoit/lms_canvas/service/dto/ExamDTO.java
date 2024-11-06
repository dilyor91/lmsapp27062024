package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.ExamTypeEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Exam} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExamDTO implements Serializable {

    private Long id;

    private ExamTypeEnum type;

    private Float maxPoint;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExamTypeEnum getType() {
        return type;
    }

    public void setType(ExamTypeEnum type) {
        this.type = type;
    }

    public Float getMaxPoint() {
        return maxPoint;
    }

    public void setMaxPoint(Float maxPoint) {
        this.maxPoint = maxPoint;
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
        if (!(o instanceof ExamDTO)) {
            return false;
        }

        ExamDTO examDTO = (ExamDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, examDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExamDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", maxPoint=" + getMaxPoint() +
            ", course=" + getCourse() +
            "}";
    }
}
