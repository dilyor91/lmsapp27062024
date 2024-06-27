package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AttendanceTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.LessonTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AttendanceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attendance.class);
        Attendance attendance1 = getAttendanceSample1();
        Attendance attendance2 = new Attendance();
        assertThat(attendance1).isNotEqualTo(attendance2);

        attendance2.setId(attendance1.getId());
        assertThat(attendance1).isEqualTo(attendance2);

        attendance2 = getAttendanceSample2();
        assertThat(attendance1).isNotEqualTo(attendance2);
    }

    @Test
    void studentTest() {
        Attendance attendance = getAttendanceRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        attendance.setStudent(studentBack);
        assertThat(attendance.getStudent()).isEqualTo(studentBack);

        attendance.student(null);
        assertThat(attendance.getStudent()).isNull();
    }

    @Test
    void lessonTest() {
        Attendance attendance = getAttendanceRandomSampleGenerator();
        Lesson lessonBack = getLessonRandomSampleGenerator();

        attendance.setLesson(lessonBack);
        assertThat(attendance.getLesson()).isEqualTo(lessonBack);

        attendance.lesson(null);
        assertThat(attendance.getLesson()).isNull();
    }

    @Test
    void courseTest() {
        Attendance attendance = getAttendanceRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        attendance.setCourse(courseBack);
        assertThat(attendance.getCourse()).isEqualTo(courseBack);

        attendance.course(null);
        assertThat(attendance.getCourse()).isNull();
    }

    @Test
    void courseSectionTest() {
        Attendance attendance = getAttendanceRandomSampleGenerator();
        CourseSection courseSectionBack = getCourseSectionRandomSampleGenerator();

        attendance.setCourseSection(courseSectionBack);
        assertThat(attendance.getCourseSection()).isEqualTo(courseSectionBack);

        attendance.courseSection(null);
        assertThat(attendance.getCourseSection()).isNull();
    }
}
