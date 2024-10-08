package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CommunityCourse} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommunityCourseDTO implements Serializable {

    private Long id;

    private CommunityDTO community;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CommunityDTO getCommunity() {
        return community;
    }

    public void setCommunity(CommunityDTO community) {
        this.community = community;
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
        if (!(o instanceof CommunityCourseDTO)) {
            return false;
        }

        CommunityCourseDTO communityCourseDTO = (CommunityCourseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, communityCourseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommunityCourseDTO{" +
            "id=" + getId() +
            ", community=" + getCommunity() +
            ", course=" + getCourse() +
            "}";
    }
}
