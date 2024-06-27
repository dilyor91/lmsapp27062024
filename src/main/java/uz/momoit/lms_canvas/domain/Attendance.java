package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.AttendanceEnum;

/**
 * A Attendance.
 */
@Entity
@Table(name = "attendance")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Attendance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "attendance_enum")
    private AttendanceEnum attendanceEnum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "studyAcademicYear", "user", "faculty", "speciality", "group" }, allowSetters = true)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "course" }, allowSetters = true)
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "course", "announcements", "assignments" }, allowSetters = true)
    private CourseSection courseSection;

    @ManyToOne(fetch = FetchType.LAZY)
    private User teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Attendance id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttendanceEnum getAttendanceEnum() {
        return this.attendanceEnum;
    }

    public Attendance attendanceEnum(AttendanceEnum attendanceEnum) {
        this.setAttendanceEnum(attendanceEnum);
        return this;
    }

    public void setAttendanceEnum(AttendanceEnum attendanceEnum) {
        this.attendanceEnum = attendanceEnum;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Attendance student(Student student) {
        this.setStudent(student);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public Attendance lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Attendance course(Course course) {
        this.setCourse(course);
        return this;
    }

    public CourseSection getCourseSection() {
        return this.courseSection;
    }

    public void setCourseSection(CourseSection courseSection) {
        this.courseSection = courseSection;
    }

    public Attendance courseSection(CourseSection courseSection) {
        this.setCourseSection(courseSection);
        return this;
    }

    public User getTeacher() {
        return this.teacher;
    }

    public void setTeacher(User user) {
        this.teacher = user;
    }

    public Attendance teacher(User user) {
        this.setTeacher(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attendance)) {
            return false;
        }
        return getId() != null && getId().equals(((Attendance) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Attendance{" +
            "id=" + getId() +
            ", attendanceEnum='" + getAttendanceEnum() + "'" +
            "}";
    }
}
