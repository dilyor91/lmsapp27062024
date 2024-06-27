package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuestionGroupTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuestionGroupTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionGroup.class);
        QuestionGroup questionGroup1 = getQuestionGroupSample1();
        QuestionGroup questionGroup2 = new QuestionGroup();
        assertThat(questionGroup1).isNotEqualTo(questionGroup2);

        questionGroup2.setId(questionGroup1.getId());
        assertThat(questionGroup1).isEqualTo(questionGroup2);

        questionGroup2 = getQuestionGroupSample2();
        assertThat(questionGroup1).isNotEqualTo(questionGroup2);
    }

    @Test
    void courseTest() {
        QuestionGroup questionGroup = getQuestionGroupRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        questionGroup.setCourse(courseBack);
        assertThat(questionGroup.getCourse()).isEqualTo(courseBack);

        questionGroup.course(null);
        assertThat(questionGroup.getCourse()).isNull();
    }
}
