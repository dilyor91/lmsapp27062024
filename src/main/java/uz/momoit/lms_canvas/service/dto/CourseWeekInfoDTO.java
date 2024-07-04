package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CourseWeekInfo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseWeekInfoDTO implements Serializable {

    private Long id;

    private Integer totalWeek;

    private Integer lessonPerWeek;

    private Instant startDate;

    private Integer weekDayCount;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalWeek() {
        return totalWeek;
    }

    public void setTotalWeek(Integer totalWeek) {
        this.totalWeek = totalWeek;
    }

    public Integer getLessonPerWeek() {
        return lessonPerWeek;
    }

    public void setLessonPerWeek(Integer lessonPerWeek) {
        this.lessonPerWeek = lessonPerWeek;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Integer getWeekDayCount() {
        return weekDayCount;
    }

    public void setWeekDayCount(Integer weekDayCount) {
        this.weekDayCount = weekDayCount;
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
        if (!(o instanceof CourseWeekInfoDTO)) {
            return false;
        }

        CourseWeekInfoDTO courseWeekInfoDTO = (CourseWeekInfoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, courseWeekInfoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseWeekInfoDTO{" +
            "id=" + getId() +
            ", totalWeek=" + getTotalWeek() +
            ", lessonPerWeek=" + getLessonPerWeek() +
            ", startDate='" + getStartDate() + "'" +
            ", weekDayCount=" + getWeekDayCount() +
            ", course=" + getCourse() +
            "}";
    }
}
