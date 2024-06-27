package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.AttendanceEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.AttendanceDetail} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AttendanceDetailDTO implements Serializable {

    private Long id;

    private AttendanceEnum attendanceEnum;

    private AttendanceDTO attendance;

    private UserDTO student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttendanceEnum getAttendanceEnum() {
        return attendanceEnum;
    }

    public void setAttendanceEnum(AttendanceEnum attendanceEnum) {
        this.attendanceEnum = attendanceEnum;
    }

    public AttendanceDTO getAttendance() {
        return attendance;
    }

    public void setAttendance(AttendanceDTO attendance) {
        this.attendance = attendance;
    }

    public UserDTO getStudent() {
        return student;
    }

    public void setStudent(UserDTO student) {
        this.student = student;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttendanceDetailDTO)) {
            return false;
        }

        AttendanceDetailDTO attendanceDetailDTO = (AttendanceDetailDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, attendanceDetailDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttendanceDetailDTO{" +
            "id=" + getId() +
            ", attendanceEnum='" + getAttendanceEnum() + "'" +
            ", attendance=" + getAttendance() +
            ", student=" + getStudent() +
            "}";
    }
}
