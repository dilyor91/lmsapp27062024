package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TimeTable.
 */
@Entity
@Table(name = "time_table")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TimeTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "week_number")
    private Integer weekNumber;

    @Column(name = "week_day_number")
    private Integer weekDayNumber;

    @Column(name = "pair_number")
    private Integer pairNumber;

    @Column(name = "actial_date")
    private Instant actialDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "courseWeekInfo" }, allowSetters = true)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "faculty", "department" }, allowSetters = true)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "faculty" }, allowSetters = true)
    private Building building;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "building" }, allowSetters = true)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "studyAcademicYear" }, allowSetters = true)
    private StudyTerm studyTerm;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TimeTable id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeekNumber() {
        return this.weekNumber;
    }

    public TimeTable weekNumber(Integer weekNumber) {
        this.setWeekNumber(weekNumber);
        return this;
    }

    public void setWeekNumber(Integer weekNumber) {
        this.weekNumber = weekNumber;
    }

    public Integer getWeekDayNumber() {
        return this.weekDayNumber;
    }

    public TimeTable weekDayNumber(Integer weekDayNumber) {
        this.setWeekDayNumber(weekDayNumber);
        return this;
    }

    public void setWeekDayNumber(Integer weekDayNumber) {
        this.weekDayNumber = weekDayNumber;
    }

    public Integer getPairNumber() {
        return this.pairNumber;
    }

    public TimeTable pairNumber(Integer pairNumber) {
        this.setPairNumber(pairNumber);
        return this;
    }

    public void setPairNumber(Integer pairNumber) {
        this.pairNumber = pairNumber;
    }

    public Instant getActialDate() {
        return this.actialDate;
    }

    public TimeTable actialDate(Instant actialDate) {
        this.setActialDate(actialDate);
        return this;
    }

    public void setActialDate(Instant actialDate) {
        this.actialDate = actialDate;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public TimeTable course(Course course) {
        this.setCourse(course);
        return this;
    }

    public Teacher getTeacher() {
        return this.teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public TimeTable teacher(Teacher teacher) {
        this.setTeacher(teacher);
        return this;
    }

    public Building getBuilding() {
        return this.building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public TimeTable building(Building building) {
        this.setBuilding(building);
        return this;
    }

    public Room getRoom() {
        return this.room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public TimeTable room(Room room) {
        this.setRoom(room);
        return this;
    }

    public StudyTerm getStudyTerm() {
        return this.studyTerm;
    }

    public void setStudyTerm(StudyTerm studyTerm) {
        this.studyTerm = studyTerm;
    }

    public TimeTable studyTerm(StudyTerm studyTerm) {
        this.setStudyTerm(studyTerm);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TimeTable)) {
            return false;
        }
        return getId() != null && getId().equals(((TimeTable) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TimeTable{" +
            "id=" + getId() +
            ", weekNumber=" + getWeekNumber() +
            ", weekDayNumber=" + getWeekDayNumber() +
            ", pairNumber=" + getPairNumber() +
            ", actialDate='" + getActialDate() + "'" +
            "}";
    }
}
