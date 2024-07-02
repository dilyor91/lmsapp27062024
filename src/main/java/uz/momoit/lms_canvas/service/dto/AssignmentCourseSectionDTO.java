package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.AssignmentCourseSection} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AssignmentCourseSectionDTO implements Serializable {

    private Long id;

    private Instant startDate;

    private Instant endDate;

    private AssignmentDTO assignment;

    private CourseDTO course;

    private CourseSectionDTO courseSection;

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

    public AssignmentDTO getAssignment() {
        return assignment;
    }

    public void setAssignment(AssignmentDTO assignment) {
        this.assignment = assignment;
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
        if (!(o instanceof AssignmentCourseSectionDTO)) {
            return false;
        }

        AssignmentCourseSectionDTO assignmentCourseSectionDTO = (AssignmentCourseSectionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, assignmentCourseSectionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AssignmentCourseSectionDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", assignment=" + getAssignment() +
            ", course=" + getCourse() +
            ", courseSection=" + getCourseSection() +
            "}";
    }
}
