package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.AnnouncementCourseSection} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnnouncementCourseSectionDTO implements Serializable {

    private Long id;

    private AnnouncementDTO announcement;

    private CourseDTO course;

    private CourseSectionDTO courseSection;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AnnouncementDTO getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(AnnouncementDTO announcement) {
        this.announcement = announcement;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnnouncementCourseSectionDTO)) {
            return false;
        }

        AnnouncementCourseSectionDTO announcementCourseSectionDTO = (AnnouncementCourseSectionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, announcementCourseSectionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnnouncementCourseSectionDTO{" +
            "id=" + getId() +
            ", announcement=" + getAnnouncement() +
            ", course=" + getCourse() +
            ", courseSection=" + getCourseSection() +
            "}";
    }
}
