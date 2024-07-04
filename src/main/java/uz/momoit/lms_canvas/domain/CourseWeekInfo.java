package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CourseWeekInfo.
 */
@Entity
@Table(name = "course_week_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseWeekInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "total_week")
    private Integer totalWeek;

    @Column(name = "lesson_per_week")
    private Integer lessonPerWeek;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "week_day_count")
    private Integer weekDayCount;

    @JsonIgnoreProperties(value = { "user", "courseWeekInfo" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CourseWeekInfo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalWeek() {
        return this.totalWeek;
    }

    public CourseWeekInfo totalWeek(Integer totalWeek) {
        this.setTotalWeek(totalWeek);
        return this;
    }

    public void setTotalWeek(Integer totalWeek) {
        this.totalWeek = totalWeek;
    }

    public Integer getLessonPerWeek() {
        return this.lessonPerWeek;
    }

    public CourseWeekInfo lessonPerWeek(Integer lessonPerWeek) {
        this.setLessonPerWeek(lessonPerWeek);
        return this;
    }

    public void setLessonPerWeek(Integer lessonPerWeek) {
        this.lessonPerWeek = lessonPerWeek;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public CourseWeekInfo startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Integer getWeekDayCount() {
        return this.weekDayCount;
    }

    public CourseWeekInfo weekDayCount(Integer weekDayCount) {
        this.setWeekDayCount(weekDayCount);
        return this;
    }

    public void setWeekDayCount(Integer weekDayCount) {
        this.weekDayCount = weekDayCount;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public CourseWeekInfo course(Course course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourseWeekInfo)) {
            return false;
        }
        return getId() != null && getId().equals(((CourseWeekInfo) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseWeekInfo{" +
            "id=" + getId() +
            ", totalWeek=" + getTotalWeek() +
            ", lessonPerWeek=" + getLessonPerWeek() +
            ", startDate='" + getStartDate() + "'" +
            ", weekDayCount=" + getWeekDayCount() +
            "}";
    }
}
