package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.ExamResult} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExamResultDTO implements Serializable {

    private Long id;

    private Float point;

    private Instant gradedDate;

    private StudentDTO student;

    private ExamDTO exam;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPoint() {
        return point;
    }

    public void setPoint(Float point) {
        this.point = point;
    }

    public Instant getGradedDate() {
        return gradedDate;
    }

    public void setGradedDate(Instant gradedDate) {
        this.gradedDate = gradedDate;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public ExamDTO getExam() {
        return exam;
    }

    public void setExam(ExamDTO exam) {
        this.exam = exam;
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
        if (!(o instanceof ExamResultDTO)) {
            return false;
        }

        ExamResultDTO examResultDTO = (ExamResultDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, examResultDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExamResultDTO{" +
            "id=" + getId() +
            ", point=" + getPoint() +
            ", gradedDate='" + getGradedDate() + "'" +
            ", student=" + getStudent() +
            ", exam=" + getExam() +
            ", course=" + getCourse() +
            "}";
    }
}
