package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.ExamResultTestSamples.*;
import static uz.momoit.lms_canvas.domain.ExamTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class ExamResultTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExamResult.class);
        ExamResult examResult1 = getExamResultSample1();
        ExamResult examResult2 = new ExamResult();
        assertThat(examResult1).isNotEqualTo(examResult2);

        examResult2.setId(examResult1.getId());
        assertThat(examResult1).isEqualTo(examResult2);

        examResult2 = getExamResultSample2();
        assertThat(examResult1).isNotEqualTo(examResult2);
    }

    @Test
    void studentTest() {
        ExamResult examResult = getExamResultRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        examResult.setStudent(studentBack);
        assertThat(examResult.getStudent()).isEqualTo(studentBack);

        examResult.student(null);
        assertThat(examResult.getStudent()).isNull();
    }

    @Test
    void examTest() {
        ExamResult examResult = getExamResultRandomSampleGenerator();
        Exam examBack = getExamRandomSampleGenerator();

        examResult.setExam(examBack);
        assertThat(examResult.getExam()).isEqualTo(examBack);

        examResult.exam(null);
        assertThat(examResult.getExam()).isNull();
    }

    @Test
    void courseTest() {
        ExamResult examResult = getExamResultRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        examResult.setCourse(courseBack);
        assertThat(examResult.getCourse()).isEqualTo(courseBack);

        examResult.course(null);
        assertThat(examResult.getCourse()).isNull();
    }
}
