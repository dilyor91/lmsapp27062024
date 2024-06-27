package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.WhoAllowed;

/**
 * A WikiPage.
 */
@Entity
@Table(name = "wiki_page")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WikiPage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "who_allowed")
    private WhoAllowed whoAllowed;

    @Column(name = "add_to_students")
    private Boolean addToStudents;

    @Column(name = "add_to_students_date")
    private Instant addToStudentsDate;

    @Column(name = "published_at")
    private Instant publishedAt;

    @Column(name = "published")
    private Boolean published;

    @Column(name = "notify_users_changes")
    private Boolean notifyUsersChanges;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WikiPage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public WikiPage title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public WikiPage content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public WhoAllowed getWhoAllowed() {
        return this.whoAllowed;
    }

    public WikiPage whoAllowed(WhoAllowed whoAllowed) {
        this.setWhoAllowed(whoAllowed);
        return this;
    }

    public void setWhoAllowed(WhoAllowed whoAllowed) {
        this.whoAllowed = whoAllowed;
    }

    public Boolean getAddToStudents() {
        return this.addToStudents;
    }

    public WikiPage addToStudents(Boolean addToStudents) {
        this.setAddToStudents(addToStudents);
        return this;
    }

    public void setAddToStudents(Boolean addToStudents) {
        this.addToStudents = addToStudents;
    }

    public Instant getAddToStudentsDate() {
        return this.addToStudentsDate;
    }

    public WikiPage addToStudentsDate(Instant addToStudentsDate) {
        this.setAddToStudentsDate(addToStudentsDate);
        return this;
    }

    public void setAddToStudentsDate(Instant addToStudentsDate) {
        this.addToStudentsDate = addToStudentsDate;
    }

    public Instant getPublishedAt() {
        return this.publishedAt;
    }

    public WikiPage publishedAt(Instant publishedAt) {
        this.setPublishedAt(publishedAt);
        return this;
    }

    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public Boolean getPublished() {
        return this.published;
    }

    public WikiPage published(Boolean published) {
        this.setPublished(published);
        return this;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Boolean getNotifyUsersChanges() {
        return this.notifyUsersChanges;
    }

    public WikiPage notifyUsersChanges(Boolean notifyUsersChanges) {
        this.setNotifyUsersChanges(notifyUsersChanges);
        return this;
    }

    public void setNotifyUsersChanges(Boolean notifyUsersChanges) {
        this.notifyUsersChanges = notifyUsersChanges;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public WikiPage course(Course course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WikiPage)) {
            return false;
        }
        return getId() != null && getId().equals(((WikiPage) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WikiPage{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", whoAllowed='" + getWhoAllowed() + "'" +
            ", addToStudents='" + getAddToStudents() + "'" +
            ", addToStudentsDate='" + getAddToStudentsDate() + "'" +
            ", publishedAt='" + getPublishedAt() + "'" +
            ", published='" + getPublished() + "'" +
            ", notifyUsersChanges='" + getNotifyUsersChanges() + "'" +
            "}";
    }
}
