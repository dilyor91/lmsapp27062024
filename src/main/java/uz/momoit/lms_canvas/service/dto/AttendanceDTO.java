package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.AttendanceEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Attendance} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AttendanceDTO implements Serializable {

    private Long id;

    private AttendanceEnum attendanceEnum;

    private StudentDTO student;

    private LessonDTO lesson;

    private CourseDTO course;

    private CourseSectionDTO courseSection;

    private UserDTO teacher;

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

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public LessonDTO getLesson() {
        return lesson;
    }

    public void setLesson(LessonDTO lesson) {
        this.lesson = lesson;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public CourseSectionDTO getCourseSection() {
        return courseSection;
    }

    public void setCourseSection(CourseSectionDTO courseSection) {
        this.courseSection = courseSection;
    }

    public UserDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(UserDTO teacher) {
        this.teacher = teacher;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttendanceDTO)) {
            return false;
        }

        AttendanceDTO attendanceDTO = (AttendanceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, attendanceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttendanceDTO{" +
            "id=" + getId() +
            ", attendanceEnum='" + getAttendanceEnum() + "'" +
            ", student=" + getStudent() +
            ", lesson=" + getLesson() +
            ", course=" + getCourse() +
            ", courseSection=" + getCourseSection() +
            ", teacher=" + getTeacher() +
            "}";
    }
}
