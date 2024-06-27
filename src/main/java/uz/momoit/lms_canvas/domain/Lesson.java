package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.LessonTypeEnum;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "lesson_title", nullable = false)
    private String lessonTitle;

    @NotNull
    @Column(name = "start_plan_date", nullable = false)
    private Instant startPlanDate;

    @Column(name = "actual_lesson_date")
    private Instant actualLessonDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "lesson_type", nullable = false)
    private LessonTypeEnum lessonType;

    @Column(name = "video_url")
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Lesson id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLessonTitle() {
        return this.lessonTitle;
    }

    public Lesson lessonTitle(String lessonTitle) {
        this.setLessonTitle(lessonTitle);
        return this;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }

    public Instant getStartPlanDate() {
        return this.startPlanDate;
    }

    public Lesson startPlanDate(Instant startPlanDate) {
        this.setStartPlanDate(startPlanDate);
        return this;
    }

    public void setStartPlanDate(Instant startPlanDate) {
        this.startPlanDate = startPlanDate;
    }

    public Instant getActualLessonDate() {
        return this.actualLessonDate;
    }

    public Lesson actualLessonDate(Instant actualLessonDate) {
        this.setActualLessonDate(actualLessonDate);
        return this;
    }

    public void setActualLessonDate(Instant actualLessonDate) {
        this.actualLessonDate = actualLessonDate;
    }

    public LessonTypeEnum getLessonType() {
        return this.lessonType;
    }

    public Lesson lessonType(LessonTypeEnum lessonType) {
        this.setLessonType(lessonType);
        return this;
    }

    public void setLessonType(LessonTypeEnum lessonType) {
        this.lessonType = lessonType;
    }

    public String getVideoUrl() {
        return this.videoUrl;
    }

    public Lesson videoUrl(String videoUrl) {
        this.setVideoUrl(videoUrl);
        return this;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Lesson course(Course course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lesson)) {
            return false;
        }
        return getId() != null && getId().equals(((Lesson) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", lessonTitle='" + getLessonTitle() + "'" +
            ", startPlanDate='" + getStartPlanDate() + "'" +
            ", actualLessonDate='" + getActualLessonDate() + "'" +
            ", lessonType='" + getLessonType() + "'" +
            ", videoUrl='" + getVideoUrl() + "'" +
            "}";
    }
}
