package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CourseWeek} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseWeekDTO implements Serializable {

    private Long id;

    private String name;

    private Boolean published;

    private Instant weekDate;

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

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Instant getWeekDate() {
        return weekDate;
    }

    public void setWeekDate(Instant weekDate) {
        this.weekDate = weekDate;
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
        if (!(o instanceof CourseWeekDTO)) {
            return false;
        }

        CourseWeekDTO courseWeekDTO = (CourseWeekDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, courseWeekDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseWeekDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", published='" + getPublished() + "'" +
            ", weekDate='" + getWeekDate() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
