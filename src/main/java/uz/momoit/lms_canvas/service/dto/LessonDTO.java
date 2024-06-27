package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.LessonTypeEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Lesson} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LessonDTO implements Serializable {

    private Long id;

    @NotNull
    private String lessonTitle;

    @NotNull
    private Instant startPlanDate;

    private Instant actualLessonDate;

    @NotNull
    private LessonTypeEnum lessonType;

    private String videoUrl;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLessonTitle() {
        return lessonTitle;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }

    public Instant getStartPlanDate() {
        return startPlanDate;
    }

    public void setStartPlanDate(Instant startPlanDate) {
        this.startPlanDate = startPlanDate;
    }

    public Instant getActualLessonDate() {
        return actualLessonDate;
    }

    public void setActualLessonDate(Instant actualLessonDate) {
        this.actualLessonDate = actualLessonDate;
    }

    public LessonTypeEnum getLessonType() {
        return lessonType;
    }

    public void setLessonType(LessonTypeEnum lessonType) {
        this.lessonType = lessonType;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
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
        if (!(o instanceof LessonDTO)) {
            return false;
        }

        LessonDTO lessonDTO = (LessonDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, lessonDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LessonDTO{" +
            "id=" + getId() +
            ", lessonTitle='" + getLessonTitle() + "'" +
            ", startPlanDate='" + getStartPlanDate() + "'" +
            ", actualLessonDate='" + getActualLessonDate() + "'" +
            ", lessonType='" + getLessonType() + "'" +
            ", videoUrl='" + getVideoUrl() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
