package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.SubmissionTypeEnum;

/**
 * A Assignment.
 */
@Entity
@Table(name = "assignment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "points")
    private Float points;

    @Enumerated(EnumType.STRING)
    @Column(name = "submission_type")
    private SubmissionTypeEnum submissionType;

    @Column(name = "allowed_attempts")
    private Integer allowedAttempts;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "published")
    private Boolean published;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Course course;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_assignment__course_section",
        joinColumns = @JoinColumn(name = "assignment_id"),
        inverseJoinColumns = @JoinColumn(name = "course_section_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "course", "announcements", "assignments" }, allowSetters = true)
    private Set<CourseSection> courseSections = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Assignment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Assignment name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return this.content;
    }

    public Assignment content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Float getPoints() {
        return this.points;
    }

    public Assignment points(Float points) {
        this.setPoints(points);
        return this;
    }

    public void setPoints(Float points) {
        this.points = points;
    }

    public SubmissionTypeEnum getSubmissionType() {
        return this.submissionType;
    }

    public Assignment submissionType(SubmissionTypeEnum submissionType) {
        this.setSubmissionType(submissionType);
        return this;
    }

    public void setSubmissionType(SubmissionTypeEnum submissionType) {
        this.submissionType = submissionType;
    }

    public Integer getAllowedAttempts() {
        return this.allowedAttempts;
    }

    public Assignment allowedAttempts(Integer allowedAttempts) {
        this.setAllowedAttempts(allowedAttempts);
        return this;
    }

    public void setAllowedAttempts(Integer allowedAttempts) {
        this.allowedAttempts = allowedAttempts;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public Assignment startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return this.endDate;
    }

    public Assignment endDate(Instant endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getDueDate() {
        return this.dueDate;
    }

    public Assignment dueDate(Instant dueDate) {
        this.setDueDate(dueDate);
        return this;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Boolean getPublished() {
        return this.published;
    }

    public Assignment published(Boolean published) {
        this.setPublished(published);
        return this;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Assignment course(Course course) {
        this.setCourse(course);
        return this;
    }

    public Set<CourseSection> getCourseSections() {
        return this.courseSections;
    }

    public void setCourseSections(Set<CourseSection> courseSections) {
        this.courseSections = courseSections;
    }

    public Assignment courseSections(Set<CourseSection> courseSections) {
        this.setCourseSections(courseSections);
        return this;
    }

    public Assignment addCourseSection(CourseSection courseSection) {
        this.courseSections.add(courseSection);
        return this;
    }

    public Assignment removeCourseSection(CourseSection courseSection) {
        this.courseSections.remove(courseSection);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Assignment)) {
            return false;
        }
        return getId() != null && getId().equals(((Assignment) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Assignment{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", points=" + getPoints() +
            ", submissionType='" + getSubmissionType() + "'" +
            ", allowedAttempts=" + getAllowedAttempts() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", published='" + getPublished() + "'" +
            "}";
    }
}
