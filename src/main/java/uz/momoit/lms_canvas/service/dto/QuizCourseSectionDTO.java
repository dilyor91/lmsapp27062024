package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.QuizCourseSection} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuizCourseSectionDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    private CourseDTO course;

    private CourseSectionDTO courseSection;

    private QuizDTO quiz;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public CourseSectionDTO getCourseSection() {
        return courseSection;
    }

    public void setCourseSection(CourseSectionDTO courseSection) {
        this.courseSection = courseSection;
    }

    public QuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDTO quiz) {
        this.quiz = quiz;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuizCourseSectionDTO)) {
            return false;
        }

        QuizCourseSectionDTO quizCourseSectionDTO = (QuizCourseSectionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, quizCourseSectionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuizCourseSectionDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", course=" + getCourse() +
            ", courseSection=" + getCourseSection() +
            ", quiz=" + getQuiz() +
            "}";
    }
}
