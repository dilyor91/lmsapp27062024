package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.ExamTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class ExamTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exam.class);
        Exam exam1 = getExamSample1();
        Exam exam2 = new Exam();
        assertThat(exam1).isNotEqualTo(exam2);

        exam2.setId(exam1.getId());
        assertThat(exam1).isEqualTo(exam2);

        exam2 = getExamSample2();
        assertThat(exam1).isNotEqualTo(exam2);
    }

    @Test
    void courseTest() {
        Exam exam = getExamRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        exam.setCourse(courseBack);
        assertThat(exam.getCourse()).isEqualTo(courseBack);

        exam.course(null);
        assertThat(exam.getCourse()).isNull();
    }
}
