package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CourseSection.
 */
@Entity
@Table(name = "course_section")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseSection implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "section_name", nullable = false)
    private String sectionName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Course course;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "courseSections")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "course", "courseSections" }, allowSetters = true)
    private Set<Announcement> announcements = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CourseSection id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSectionName() {
        return this.sectionName;
    }

    public CourseSection sectionName(String sectionName) {
        this.setSectionName(sectionName);
        return this;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public CourseSection course(Course course) {
        this.setCourse(course);
        return this;
    }

    public Set<Announcement> getAnnouncements() {
        return this.announcements;
    }

    public void setAnnouncements(Set<Announcement> announcements) {
        if (this.announcements != null) {
            this.announcements.forEach(i -> i.removeCourseSection(this));
        }
        if (announcements != null) {
            announcements.forEach(i -> i.addCourseSection(this));
        }
        this.announcements = announcements;
    }

    public CourseSection announcements(Set<Announcement> announcements) {
        this.setAnnouncements(announcements);
        return this;
    }

    public CourseSection addAnnouncement(Announcement announcement) {
        this.announcements.add(announcement);
        announcement.getCourseSections().add(this);
        return this;
    }

    public CourseSection removeAnnouncement(Announcement announcement) {
        this.announcements.remove(announcement);
        announcement.getCourseSections().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourseSection)) {
            return false;
        }
        return getId() != null && getId().equals(((CourseSection) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseSection{" +
            "id=" + getId() +
            ", sectionName='" + getSectionName() + "'" +
            "}";
    }
}
