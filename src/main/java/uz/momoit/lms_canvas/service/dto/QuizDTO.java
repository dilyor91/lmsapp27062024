package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Quiz} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuizDTO implements Serializable {

    private Long id;

    @NotNull
    private String quizName;

    @NotNull
    private Integer timeInMinute;

    private Boolean published;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public Integer getTimeInMinute() {
        return timeInMinute;
    }

    public void setTimeInMinute(Integer timeInMinute) {
        this.timeInMinute = timeInMinute;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuizDTO)) {
            return false;
        }

        QuizDTO quizDTO = (QuizDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, quizDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuizDTO{" +
            "id=" + getId() +
            ", quizName='" + getQuizName() + "'" +
            ", timeInMinute=" + getTimeInMinute() +
            ", published='" + getPublished() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
