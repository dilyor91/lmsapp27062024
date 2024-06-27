package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.WhoAllowed;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.WikiPage} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WikiPageDTO implements Serializable {

    private Long id;

    private String title;

    private String content;

    private WhoAllowed whoAllowed;

    private Boolean addToStudents;

    private Instant addToStudentsDate;

    private Instant publishedAt;

    private Boolean published;

    private Boolean notifyUsersChanges;

    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public WhoAllowed getWhoAllowed() {
        return whoAllowed;
    }

    public void setWhoAllowed(WhoAllowed whoAllowed) {
        this.whoAllowed = whoAllowed;
    }

    public Boolean getAddToStudents() {
        return addToStudents;
    }

    public void setAddToStudents(Boolean addToStudents) {
        this.addToStudents = addToStudents;
    }

    public Instant getAddToStudentsDate() {
        return addToStudentsDate;
    }

    public void setAddToStudentsDate(Instant addToStudentsDate) {
        this.addToStudentsDate = addToStudentsDate;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Boolean getNotifyUsersChanges() {
        return notifyUsersChanges;
    }

    public void setNotifyUsersChanges(Boolean notifyUsersChanges) {
        this.notifyUsersChanges = notifyUsersChanges;
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
        if (!(o instanceof WikiPageDTO)) {
            return false;
        }

        WikiPageDTO wikiPageDTO = (WikiPageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, wikiPageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WikiPageDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", whoAllowed='" + getWhoAllowed() + "'" +
            ", addToStudents='" + getAddToStudents() + "'" +
            ", addToStudentsDate='" + getAddToStudentsDate() + "'" +
            ", publishedAt='" + getPublishedAt() + "'" +
            ", published='" + getPublished() + "'" +
            ", notifyUsersChanges='" + getNotifyUsersChanges() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
