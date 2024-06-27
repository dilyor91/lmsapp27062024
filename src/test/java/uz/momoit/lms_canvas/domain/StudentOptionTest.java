package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.OptionTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentOptionTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentQuestionTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentOptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentOption.class);
        StudentOption studentOption1 = getStudentOptionSample1();
        StudentOption studentOption2 = new StudentOption();
        assertThat(studentOption1).isNotEqualTo(studentOption2);

        studentOption2.setId(studentOption1.getId());
        assertThat(studentOption1).isEqualTo(studentOption2);

        studentOption2 = getStudentOptionSample2();
        assertThat(studentOption1).isNotEqualTo(studentOption2);
    }

    @Test
    void studentQuestionTest() {
        StudentOption studentOption = getStudentOptionRandomSampleGenerator();
        StudentQuestion studentQuestionBack = getStudentQuestionRandomSampleGenerator();

        studentOption.setStudentQuestion(studentQuestionBack);
        assertThat(studentOption.getStudentQuestion()).isEqualTo(studentQuestionBack);

        studentOption.studentQuestion(null);
        assertThat(studentOption.getStudentQuestion()).isNull();
    }

    @Test
    void optionTest() {
        StudentOption studentOption = getStudentOptionRandomSampleGenerator();
        Option optionBack = getOptionRandomSampleGenerator();

        studentOption.setOption(optionBack);
        assertThat(studentOption.getOption()).isEqualTo(optionBack);

        studentOption.option(null);
        assertThat(studentOption.getOption()).isNull();
    }
}
