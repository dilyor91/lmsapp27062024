package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.AttendanceEnum;

/**
 * A AttendanceDetail.
 */
@Entity
@Table(name = "attendance_detail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AttendanceDetail implements Serializable {

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
    @JsonIgnoreProperties(value = { "student", "lesson", "course", "courseSection", "teacher" }, allowSetters = true)
    private Attendance attendance;

    @ManyToOne(fetch = FetchType.LAZY)
    private User student;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AttendanceDetail id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttendanceEnum getAttendanceEnum() {
        return this.attendanceEnum;
    }

    public AttendanceDetail attendanceEnum(AttendanceEnum attendanceEnum) {
        this.setAttendanceEnum(attendanceEnum);
        return this;
    }

    public void setAttendanceEnum(AttendanceEnum attendanceEnum) {
        this.attendanceEnum = attendanceEnum;
    }

    public Attendance getAttendance() {
        return this.attendance;
    }

    public void setAttendance(Attendance attendance) {
        this.attendance = attendance;
    }

    public AttendanceDetail attendance(Attendance attendance) {
        this.setAttendance(attendance);
        return this;
    }

    public User getStudent() {
        return this.student;
    }

    public void setStudent(User user) {
        this.student = user;
    }

    public AttendanceDetail student(User user) {
        this.setStudent(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttendanceDetail)) {
            return false;
        }
        return getId() != null && getId().equals(((AttendanceDetail) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttendanceDetail{" +
            "id=" + getId() +
            ", attendanceEnum='" + getAttendanceEnum() + "'" +
            "}";
    }
}
