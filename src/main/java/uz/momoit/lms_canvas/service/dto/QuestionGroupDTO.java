package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.QuestionGroup} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuestionGroupDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private CourseDTO course;

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
        if (!(o instanceof QuestionGroupDTO)) {
            return false;
        }

        QuestionGroupDTO questionGroupDTO = (QuestionGroupDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, questionGroupDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuestionGroupDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
